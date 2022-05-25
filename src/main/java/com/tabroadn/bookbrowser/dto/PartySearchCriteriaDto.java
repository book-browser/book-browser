package com.tabroadn.bookbrowser.dto;

import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.validation.ValidPartySort;
import java.util.Optional;
import javax.validation.constraints.Min;
import lombok.Data;

@Data
public class PartySearchCriteriaDto {
  @Min(1)
  private Integer limit = 50;

  @Min(0)
  private Integer page = 0;

  @ValidPartySort private String sort = "id";
  private OrderEnum order = OrderEnum.DESC;
  private Optional<String> name;
}
