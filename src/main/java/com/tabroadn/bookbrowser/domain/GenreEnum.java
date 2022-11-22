package com.tabroadn.bookbrowser.domain;

import com.tabroadn.bookbrowser.entity.Genre;

import lombok.Getter;

@Getter
public enum GenreEnum implements DatabaseEnum {
  ACTION(4L), ADVENTURE(18L), BL(20L), COMEDY(3L), DRAMA(1L), FANTASY(2L), GAMING(19L), GL(17L), HAREM(14L),
  HISTORICAL(13L),
  HORROR(10L), MECHA(16L), MUSIC(15L), MYSTERY(11L), ROMANCE(7L),
  SCI_FI(8L), SLICE_OF_LIFE(5L), SPORTS(12L), SUPERHERO(6L), SUPERNATURAL(9L);

  private Long id;

  private GenreEnum(Long id) {
    this.id = id;
  }

  public static GenreEnum valueOfId(Long id) {
    // if (name == null)
    // throw new NullPointerException("Name is null");
    // throw new IllegalArgumentException(
    // "No enum constant " + enumClass.getCanonicalName() + "." + name);
    for (GenreEnum e : values()) {
      if (e.getId().equals(id)) {
        return e;
      }
    }
    return null;
  }

  public static GenreEnum valueOfGenre(Genre genre) {
    return valueOfId(genre.getId());
  }
}
