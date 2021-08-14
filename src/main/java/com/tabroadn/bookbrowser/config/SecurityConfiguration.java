package com.tabroadn.bookbrowser.config;

import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.RememberMeAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	@Autowired
	private DataSource dataSource;

	@Autowired
	private PersistentTokenRepository persistenceTokenRepository;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private PersistentTokenBasedRememberMeServices persistentTokenBasedRememberMeServices;

	@Autowired
	private AuthenticationProvider authenticationProvider;

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.authorizeRequests().antMatchers("/h2-console/**", "/api/**/*").permitAll();

		httpSecurity.csrf().ignoringAntMatchers("/h2-console/**", "/api/**/*");

		httpSecurity.logout().logoutUrl("/api/logout").deleteCookies("JSESSIONID").permitAll()
				.logoutSuccessHandler((httpServletRequest, httpServletResponse, authentication) -> {
					httpServletResponse.setStatus(HttpServletResponse.SC_OK);
					persistentTokenBasedRememberMeServices.logout(httpServletRequest, httpServletResponse,
							authentication);
				});

		httpSecurity.rememberMe().rememberMeServices(persistentTokenBasedRememberMeServices);

		httpSecurity.headers().frameOptions().sameOrigin();
	}

	@Autowired
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).and().authenticationProvider(authenticationProvider);
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

	@Bean
	public AuthenticationProvider rememberMeAuthenticationProvider(
			@Value("${authentication.rememberMeKey}") String rememberMeKey) {
		return new RememberMeAuthenticationProvider(rememberMeKey);
	}

	@Bean
	public PersistentTokenBasedRememberMeServices getPersistentTokenBasedRememberMeServices(
			@Value("${authentication.rememberMeKey}") String rememberMeKey) {
		PersistentTokenBasedRememberMeServices persistenceTokenBasedservice = new PersistentTokenBasedRememberMeServices(
				rememberMeKey, userDetailsService, persistenceTokenRepository);
		persistenceTokenBasedservice.setCookieName("remember-me");
		persistenceTokenBasedservice.setParameter("rememberMe");
		return persistenceTokenBasedservice;
	}

	@Bean
	public PersistentTokenRepository persistentTokenRepository() {
		JdbcTokenRepositoryImpl jdbcTokenRepository = new JdbcTokenRepositoryImpl();
		jdbcTokenRepository.setDataSource(dataSource);
		return jdbcTokenRepository;
	}
}
