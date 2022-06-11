package com.tabroadn.bookbrowser.dto;

import com.tabroadn.bookbrowser.domain.LetterEnum;
import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.entity.Genre;
import com.tabroadn.bookbrowser.validation.ValidSeriesSort;
import java.util.List;
import java.util.Optional;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SeriesSearchCriteriaDto {
  @Min(1)
  @NotNull
  private Integer limit = 50;

  @Min(0)
  @NotNull
  private Integer page = 0;

  @ValidSeriesSort private String sort = "id";

  @NotNull private OrderEnum order = OrderEnum.DESC;

  private Optional<String> query = Optional.empty();

  private Optional<String> link = Optional.empty();

  private Optional<LetterEnum> titleStartsWith = Optional.empty();

  private Optional<List<Genre>> genres = Optional.empty();
}
