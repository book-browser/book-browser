INSERT INTO user (id, username, email, password, enabled)
  values (
    0,
    'admin',
    'bookbrowser.local@gmail.com',
    '$2a$10$xrHlCjjR/BHUY/UbD.LNA.9uRgy62uWN5UK2Bo9eH4oiYfmLo35NC',
    1);

INSERT INTO authority (username, role)
  values ('admin', 'ROLE_USER');

INSERT INTO person(id, full_name)
  values (1, 'Cedric Caballes');

INSERT INTO person(id, full_name)
  values (2, 'Niki Smith');

INSERT INTO person(id, full_name)
  values (3, 'Ariel Slamet Ries');

INSERT INTO person(id, full_name)
  values (4, 'Kat Leyh');

INSERT INTO person(id, full_name)
  values (5, 'Emma Steinkellner');

INSERT INTO person(id, full_name)
  values (6, 'Jen Wang');

INSERT INTO person(id, full_name)
  values (7, 'Cory Doctorow');

INSERT INTO person(id, full_name)
  values (8, 'Noelle Stevenson');

INSERT INTO person(id, full_name)
  values (9, 'Vera Brosgol');

INSERT INTO person(id, full_name)
  values (10, 'Bryan Lee O''Malley');

INSERT INTO person(id, full_name)
  values (11, 'Nathan Fairbairn');

INSERT INTO person(id, full_name)
  values (12, 'Kerascoët');

INSERT INTO person(id, full_name)
  values (13, 'Hubert');

INSERT INTO person(id, full_name)
  values (14, 'Fabien Vehlmann');

INSERT INTO person(id, full_name)
  values (15, 'Helge Dascher');

INSERT INTO person(id, full_name)
  values (16, 'Jennifer Muro');

INSERT INTO person(id, full_name)
  values (17, 'Thomas Krajewski');

INSERT INTO person(id, full_name)
  values (18, 'Gretel Lusky');

INSERT INTO person(id, full_name)
  values (19, 'Debbie Tung');

INSERT INTO person(id, full_name)
  values (20, 'Laurie Halse Anderson');

INSERT INTO person(id, full_name)
  values (21, 'Leila del Duca');

INSERT INTO person(id, full_name)
  values (22, 'Scott McCloud');

INSERT INTO person(id, full_name)
  values (23, 'Tillie Wallen');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (1, 'The Witch''s Throne', 'Once every ten years, a random girl awakens as a witch with immeasurable power that is destined to destroy the world. To prevent this calamity from happening, four sacred tournaments are held one year prior to her birth to train and select a party of heroes strong enough to slay her. 99 years have passed since the first witch was born and felled, and the next cycle of tournaments are soon to begin. Follow Agni, a young alchemist with a penchant for explosives and revelry as she gathers her own party of wannabe heroes to participate in the tournaments and uncover the mystery behind the witch''s true origins.', FILE_READ('classpath:/images/the-witchs-throne.jpg'), '2017-08-27');

INSERT INTO book_genre VALUES(1, 2);

INSERT INTO book_link VALUES (1, 'https://tapas.io/series/thewitchsthrone', 'Tapas');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (2, 'The Deep & Dark Blue', 'After a terrible political coup usurps their noble house, Hawke and Grayson flee to stay alive and assume new identities, Hanna and Grayce. Desperation and chance lead them to the Communion of Blue, an order of magical women who spin the threads of reality to their will. As the twins learn more about the Communion, and themselves, they begin to hatch a plan to avenge their family and retake their royal home.While Hawke wants to return to his old life, Grayce struggles to keep the threads of her new life from unraveling, and realizes she wants to stay in the one place that will allow her to finally live as a girl', FILE_READ('classpath:/images/deep-and-dark-blue.jpg'), '2020-01-07');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (3, 'Witchy', 'In the witch kingdom Hyalin, the strength of your magic is determined by the length of your hair. Those that are strong enough are conscripted by the Witch Guard, who enforce the law in peacetime and protect the land during war. However, those with hair judged too long are pronounced enemies of the kingdom, and annihilated. This is called a witch burning.', FILE_READ('classpath:/images/witchy.jpg'), '2019-09-17');
  
INSERT INTO book(id, title, description, thumbnail, release_date)
  values (4, 'Cry Wolf Girl', 'The story goes like this: There was once a girl named Dawa. Having lost her family to sickness, she found herself with an emptiness inside that she did not know how to fill. Alas, in all her endeavours, nothing she tried ever left her feeling so full as the art -of trickery.', FILE_READ('classpath:/images/cry-wolf-girl.jpg'), '2019-09-01');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (5, 'Snapdragon', 'Snap’s town had a witch. At least, that’s how the rumor goes. But in reality, Jacks is just a Crocs-wearing, internet-savvy old lady who sells roadkill skeletons online. It’s creepy, sure, but Snap thinks it''s kind of cool, too. Snap needs a favor from this old woman, though, so she begins helping Jacks with her strange work. Snap gets to know her and realizes that Jacks may in fact have real magic—and an unlikely connection to Snap’s familys past.', FILE_READ('classpath:/images/snapdragon.jpg'), '2020-02-04');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (6, 'The Okay Witch', 'Thirteen-year-old Moth Hush loves all things witchy. But she’s about to discover that witches aren’t just the stuff of movies, books, and spooky stories. When some eighth-grade bullies try to ruin her Halloween, something really strange happens. It turns out that Founder’s Bluff, Massachusetts, has a centuries-old history of witch drama. And, surprise: Moth’s family is at the center of it all! When Moth’s new powers show up, things get totally out-of-control. She meets a talking cat, falls into an enchanted diary, and unlocks a hidden witch world. Secrets surface from generations past as Moth unravels the complicated legacy at the heart of her town, her family, and herself.', FILE_READ('classpath:/images/the-okay-witch.jpg'), '2019-09-03');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (7, 'The Prince and the Dressmaker', 'Paris, at the dawn of the modern age: Prince Sebastian is looking for a bride―or rather, his parents are looking for one for him. Sebastian is too busy hiding his secret life from everyone. At night he puts on daring dresses and takes Paris by storm as the fabulous Lady Crystallia―the hottest fashion icon in the world capital of fashion! Sebastian’s secret weapon (and best friend) is the brilliant dressmaker Frances―one of only two people who know the truth: sometimes this boy wears dresses. But Frances dreams of greatness, and being someone’s secret weapon means being a secret. Forever. How long can Frances defer her dreams to protect a friend? Jen Wang weaves an exuberantly romantic tale of identity, young love, art, and family. A fairy tale for any age, The Prince and the Dressmaker will steal your heart.', FILE_READ('classpath:/images/the-prince-and-the-dressmaker.jpg'), '2018-02-13');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (8, 'In Real Life', 'Anda loves Coarsegold Online, the massively-multiplayer role-playing game where she spends most of her free time. It''s a place where she can be a leader, a fighter, a hero. It''s a place where she can meet people from all over the world, and make friends. But things become a lot more complicated when Anda befriends a gold farmer--a poor Chinese kid whose avatar in the game illegally collects valuable objects and then sells them to players from developed countries with money to burn. This behavior is strictly against the rules in Coarsegold, but Anda soon comes to realize that questions of right and wrong are a lot less straightforward when a real person''s real livelihood is at stake.', FILE_READ('classpath:/images/in-real-life.jpg'), '2014-10-14');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (9, 'Nimona', 'Nemeses! Dragons! Science! Symbolism! All these and more await in this brilliantly subversive, sharply irreverent epic from Noele Stevenson. Featuring an exclusive epilogue not seen in the web comic, along with bonus conceptual sketches and revised pages throughout, this gorgeous full-color graphic novel is perfect for the legions of fans of the web comic and is sure to win Noelle many new ones. Nimona is an impulsive young shapeshifter with a knack for villainy. Lord Ballister Blackheart is a villain with a vendetta. As sidekick and supervillain, Nimona and Lord Blackheart are about to wreak some serious havoc. Their mission: prove to the kingdom that Sir Ambrosius Goldenloin and his buddies at the Institution of Law Enforcement and Heroics aren''t the heroes everyone thinks they are. But as small acts of mischief escalate into a vicious battle, Lord Blackheart realizes that Nimona''s powers are as murky and mysterious as her past. And her unpredictable wild side might be more dangerous than he is willing to admit.', FILE_READ('classpath:/images/nimona.jpg'), '2015-05-12');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (10, 'Anya''s Ghost', 'Of all the things Anya expected to find at the bottom of an old well, a new friend was not one of them. Especially not a new friend who’s been dead for a century. Falling down a well is bad enough, but Anya''s normal life might actually be worse. She''s embarrassed by her family, self-conscious about her body, and she''s pretty much given up on fitting in at school. A new friend—even a ghost—is just what she needs. Or so she thinks. Spooky, sardonic, and secretly sincere, Anya''s Ghost is a wonderfully entertaining debut from author/artist Vera Brosgol.', FILE_READ('classpath:/images/anyas-ghost.jpg'), '2011-06-07');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (11, 'Seconds', 'Katie’s got it pretty good. She’s a talented young chef, she runs a successful restaurant, and she has big plans to open an even better one. Then, all at once, progress on the new location bogs down, her charming ex-boyfriend pops up, her fling with another chef goes sour, and her best waitress gets badly hurt. And just like that, Katie’s life goes from pretty good to not so much. What she needs is a second chance. Everybody deserves one, after all—but they don’t come easy. Luckily for Katie, a mysterious girl appears in the middle of the night with simple instructions for a do-it-yourself do-over: 1. Write your mistake. 2. Ingest one mushroom. 3. Go to sleep. 4. Wake anew. And just like that, all the bad stuff never happened, and Katie is given another chance to get things right. She’s also got a dresser drawer full of magical mushrooms—and an irresistible urge to make her life not just good, but perfect. Too bad it’s against the rules. But Katie doesn’t care about the rules—and she’s about to discover the unintended consequences of the best intentions. From the mind and pen behind the acclaimed Scott Pilgrim series comes a madcap new tale of existential angst, everyday obstacles, young love, and ancient spirits that’s sharp-witted and tenderhearted, whimsical and wise.', FILE_READ('classpath:/images/seconds.jpg'), '2014-07-15');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (12, 'Beauty', 'When the repulsively ugly Coddie unintentionally saves a fairy from a spell, she does not understand the poisonous nature of the wish granted her by the fairy. The village folk no longer see her as repulsive and stinking of fish—they now perceive her as magnetically beautiful—which does not help her in her village. A young local lord saves her, but it soon becomes apparent that Coddie’s destiny may be far greater than anyone ever imagined. Caustic and flamboyant, this fairy tale offers grownups an engrossing take on the nature of beauty.', FILE_READ('classpath:/images/beauty.jpg'), '2014-10-01');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (13, 'Beautiful Darkness', 'Kerascoët’s and Fabien Vehlmann’s unsettling and gorgeous anti-fairy tale is a searing condemnation of our vast capacity for evil writ tiny. Join princess Aurora and her friends as they journey to civilization''s heart of darkness in a bleak allegory about surviving the human experience.  The sweet faces and bright leaves of Kerascoët’s delicate watercolors serve to highlight the evil that dwells beneath Vehlmann''s story as pettiness, greed, and jealousy take over. Beautiful Darkness is a harrowing look behind the routine politeness and meaningless kindness of civilized society.', FILE_READ('classpath:/images/beautiful-darkness.jpg'), '2014-02-25');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (14, 'Primer', 'Ashley Rayburn is an upbeat girl with a decidedly downbeat past. Her father is a known criminal who once used Ashley to help him elude justice, and in his attempt to escape, a life was taken. He now sits in federal prison, but still casts a shadow over Ashley''s life. In the meantime, Ashley has bounced from foster home to foster home and represents a real challenge to the social workers who try to help her-not because she''s inherently bad, but because trouble always seems to find her. Ashley''s latest set of presumably short-term foster parents are Kitch and Yuka Nolan. Like Ashley, Kitch happens to be an artist. Yuka, on the other hand, is a geneticist working for a very high-level tech company, one that''s contracted out to work for the government and the military. And it''s Yuka''s latest top secret project that has her very concerned. Developed for the military, it''s a set of body paints that, when applied to the wearer, grant them a wide range of special powers. Fearful that this invention will be misused, Yuka sneaks the set of paints home, substituting a dummy suitcase with an ordinary set of paints in their place. From here, signals get crossed. Ashley comes home from school one day with her new friend Luke and, thinking that the Nolans have purchased a surprise gift for her upcoming birthday, finds the set of paints. Being an artist, Ashley naturally assumes these are for her. It isn''t long before she realizes that she''s stumbled upon something much bigger and a lot more dangerous. Although she uses her newly discovered powers for good, it''s not long before the military becomes wise to what happened to their secret weapon. And this spells big trouble not only for Ashley, but for her newfound family and friends as well. ', FILE_READ('classpath:/images/primer.jpg'), '2020-06-23');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (15, 'Happily Ever After & Everything In Between', 'The comics in Happily Ever After & Everything In Between may be inspired by Debbie Tung’s marriage to her extrovert husband, but any couple can relate to increasingly relaxed anniversaries, slowly seeing more of each other’s weird sides, or the punishment for taking care of your sick loved one (catching whatever they had). Happily Ever After humorously captures what everyday love looks like—both the sweet moments and the mundane—making it a fitting gift for weddings, anniversaries, and Valentine’s Day.', FILE_READ('classpath:/images/happily-ever-after.jpg'), '2020-06-02');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (16, 'Wonder Woman: Tempest Tossed', 'Princess Diana believes that her 16th birthday will be one of new beginnings--namely acceptance into the warrior tribe of Amazons. The celebrations are cut short, however, when rafts of refugees break through the Themysciran barrier. Diana tries to help them, but she is swept away by the sea--and from her home--thus becoming a refugee herself. Now Diana must survive in the world outside of Themyscira for the first time; the world that is filled with danger and injustice. She must redefine what it means to belong, to be an Amazon, and to make a difference.', FILE_READ('classpath:/images/wonder-woman-tempest-tossed.jpg'), '2020-06-02');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (17, 'Understanding Comics: The Invisible Art', 'Scott McCloud''s Understanding Comics is a seminal examination of comics art: its rich history, surprising technical components, and major cultural significance. Explore the secret world between the panels, through the lines, and within the hidden symbols of a powerful but misunderstood art form.', FILE_READ('classpath:/images/understanding-comics-the-invisible-art.jpg'), '1993-01-01');

INSERT INTO book(id, title, description, thumbnail, release_date)
  values (18, 'Spinning', 'It was the same every morning. Wake up, grab the ice skates, and head to the rink while the world was still dark. Weekends were spent in glitter and tights at competitions. Perform. Smile. And do it again. She was good. She won. And she hated it. For ten years, figure skating was Tillie Walden''s life. She woke before dawn for morning lessons, went straight to group practice after school, and spent weekends competing at ice rinks across the state. It was a central piece of her identity, her safe haven from the stress of school, bullies, and family. But over time, as she switched schools, got into art, and fell in love with her first girlfriend, she began to question how the close-minded world of figure skating fit in with the rest of her life, and whether all the work was worth it given the reality: that she, and her friends on the figure skating team, were nowhere close to Olympic hopefuls. It all led to one question: What was the point? The more Tillie thought about it, the more Tillie realized she''d outgrown her passion-and she finally needed to find her own voice.', FILE_READ('classpath:/images/spinning.jpg'), '2017-09-12');

INSERT INTO creator(book_id, person_id)
  values (1, 1);

INSERT INTO creator(book_id, person_id)
  values (2, 2);

INSERT INTO creator(book_id, person_id)
  values (3, 3);

INSERT INTO creator(book_id, person_id)
  values (4, 3);

INSERT INTO creator(book_id, person_id)
  values (5, 4);

INSERT INTO creator(book_id, person_id)
  values (6, 5);

INSERT INTO creator(book_id, person_id)
  values (7, 6);

INSERT INTO creator(book_id, person_id)
  values (8, 7);

INSERT INTO creator(book_id, person_id, role)
  values (8, 6, 'ILLUSTRATOR');

INSERT INTO creator(book_id, person_id)
  values (9, 8);

INSERT INTO creator(book_id, person_id)
  values (10, 9);

INSERT INTO creator(book_id, person_id)
  values (11, 10);

INSERT INTO creator(book_id, person_id, role)
  values (11, 11, 'COLORIST');

INSERT INTO creator(book_id, person_id, role)
  values (12, 12, 'ILLUSTRATOR');

INSERT INTO creator(book_id, person_id)
  values (12, 13);
  
INSERT INTO creator(book_id, person_id)
  values (13, 12);

INSERT INTO creator(book_id, person_id, role)
  values (13, 14, 'ILLUSTRATOR');

INSERT INTO creator(book_id, person_id, role)
  values (13, 15, 'TRANSLATOR');

INSERT INTO creator(book_id, person_id, role)
  values (14, 16, 'AUTHOR');

INSERT INTO creator(book_id, person_id, role)
  values (14, 17, 'AUTHOR');

INSERT INTO creator(book_id, person_id, role)
  values (14, 18, 'ILLUSTRATOR');

INSERT INTO creator(book_id, person_id)
  values (15, 19);

INSERT INTO creator(book_id, person_id)
  values (16, 20);

INSERT INTO creator(book_id, person_id)
  values (16, 21);

INSERT INTO creator(book_id, person_id)
  values (17, 22);

INSERT INTO creator(book_id, person_id)
  values (18, 23);