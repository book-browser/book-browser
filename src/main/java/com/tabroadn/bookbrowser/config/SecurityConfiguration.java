package com.tabroadn.bookbrowser.config;

import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	@Autowired
	private DataSource dataSource;

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.authorizeRequests()
					.antMatchers("/h2-console/**", "/api/**/*")
					.permitAll();
		
		httpSecurity.csrf()
					.ignoringAntMatchers("/h2-console/**", "/api/**/*");
		
		httpSecurity.logout()
					.logoutUrl("/api/logout")
					.permitAll()
					.logoutSuccessHandler((httpServletRequest, httpServletResponse, authentication) -> {
					    httpServletResponse.setStatus(HttpServletResponse.SC_OK);
					});
			
		httpSecurity.headers()
					.frameOptions()
					.sameOrigin();
	}
	
	@Autowired
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.jdbcAuthentication()
			.dataSource(dataSource)
			.usersByUsernameQuery(
					"select username,password,enabled "
				  + "from book_browser.user "
				  + "where username = ?")
			.authoritiesByUsernameQuery(
					"select username,role "
		          + "from book_browser.authority "
		          + "where username = ?");		
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}
	
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	 }
}
