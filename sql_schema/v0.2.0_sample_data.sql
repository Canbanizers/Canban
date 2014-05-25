INSERT INTO `canban`.`users` (`id`, `email`, `firstname`, `lastname`, `password`, `last_login`)
VALUES
#pw = Mustermann
	('1', 'max@mustermann.de', 'max', 'mustermann', '$2y$10$YXV3JTJNfUhLNSw9YTp0W.chxJ.D.fiEXOvRbrO3TEysOa1IUjKiK',
	 NULL),
#pw = Smith
	('2', 'john@smith.com', 'john', 'smith', '$2y$10$YXV3JTJNfUhLNSw9YTp0W.fTzp6IHuEZ9PSWtFNJgmrcv8cWm0Lpy',
	 '2014-05-23 09:20:00'),
#pw = they_killed_kenny
	('3', 'kenny@southpark.com', '', '', '$2y$10$YXV3JTJNfUhLNSw9YTp0W.H174j/CexjW2sPmYmIaFXfpDdzr0X0.',
	 '2014-04-23 18:45:15');

INSERT INTO `canban`.`boards` (`ID`, `NAME`, `PARENT`, `CREATION_DATE`)
VALUES
	('1', 'Personal Board', NULL, CURRENT_TIMESTAMP),
	('2', 'Personal Board', NULL, '2014-05-14 05:22:38'),
	('3', 'Personal Board', NULL, '2013-11-21 17:01:10'),
	('4', 'Build Dog House', NULL, '2014-05-14 05:22:38'),
	('5', 'Take a woodshop class', '4', '2014-05-14 05:22:38');

INSERT INTO `canban`.`userhasboard` (`ID`, `ID_USER`, `ID_BOARD`)
VALUES
	('1', '1', '1'),
	('2', '2', '2'),
	('3', '3', '3'),
	('4', '2', '4'),
	('5', '2', '5');

INSERT INTO `canban`.`tickets` (`id`, `state`, `content`, `priority`, `creation_date`, `last_modify_date`, `title`)
VALUES
	('1', '1', 'This is an example ticket. You can finish or ignore it.', '0', CURRENT_TIMESTAMP, NULL,
	 'Welcome to Personal Kanban'),
('2', '2', 'This is an example ticket. You can finish or ignore it.', '0', '2014-05-14 05:22:38', '2014-05-14 05:30:15', 'Welcome to Personal Kanban'),
('3', '3', 'This is an example ticket. You can finish or ignore it.', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Welcome to Personal Kanban'),
('4', '1', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies', '0', '2014-05-14 05:22:38', NULL, 'Quisque rutrum Aenean imperdiet'),
('5', '1', 'Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und Konsonantien leben die Blindtexte. Abgeschieden wohnen sie in Buchstabhausen an der Küste des Semantik, eines großen Sprachozeans. Ein kleines Bächlein namens Duden fließt durch ihren Ort und versorgt sie mit den nötigen Regelialien. Es ist ein paradiesmatisches Land, in dem', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Bächlein namens Duden'),
('6', '1', 'Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und Konsonantien leben die Blindtexte. Abgeschieden wohnen sie in Buchstabhausen an der Küste des Semantik, eines großen Sprachozeans. Ein kleines Bächlein namens Duden fließt durch ihren Ort und versorgt sie mit den nötigen Regelialien. Es ist ein paradiesmatisches Land, in dem einem gebratene Satzteile in den Mund fliegen. Nicht einmal von der allmächtigen Interpunktion werden die Blindtexte beherrscht – ein geradezu unorthographisches Leben. Eines Tages aber beschloß eine kleine Zeile Blindtext, ihr davon ab, da', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Lorem Ipsum'),
('7', '1', 'Er hörte leise Schritte hinter sich. Das bedeutete nichts Gutes. Wer würde ihm schon folgen, spät in der Nacht und dazu noch in dieser engen Gasse mitten im übel beleumundeten Hafenviertel? Gerade jetzt, wo er das Ding seines Lebens gedreht hatte und mit der Beute verschwinden wollte! Hatte einer seiner zahllosen Kollegen dieselbe Idee gehabt, ihn beobachtet und abgewartet, um ihn nun um die Früchte seiner Arbeit zu erleichtern? Oder gehörten die Schritte hinter ihm zu einem der unzähligen Gesetzeshüter dieser Stadt.', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Wayne Tasks'),
('8', '1', 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'plu simplic'),
('9', '1', 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Presence of the Almighty'),
('10', '2', 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What''s happened to me?" he thought. It wasn''t a ', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Travelling salesman'),
('11', '2', 'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! ', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Jinx zippy fowls'),
('12', '2', 'The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting ', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'European languages'),
('13', '2', 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Laborious physical exercise'),
('14', '2', 'Top le me games cuteness overload close enough star wars face cool. Right i see what you did there search panda humor not okay monocle bacon left blizzard angry birds. Viverra cat rebecca black silent hill problem? Dummies computer captain mother on yao puking rainbows scumbag too mainstream gasp win. Coffee like a boss fun pikachu geek asian in class derpina facepalm. Wodka creepy me gusta vegan so close elephant male people no cereal guy. I Dont Get It that facebook a pizza party no bad tank one does not simply ', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Pokeman bear'),
('15', '2', 'Dad asian scumbag joke admire cereal sandwich steve jobs ba dumm tss bottom computer. 140% students cuteness overload problem? Collection venenatis in class creepy me gusta twitter left donut brother cat rebecca black. Yao dummies basic math feel like a sir money anonymous search trolololo panda impossibru. Michelle movie sister a unsave phone face morbi genius. No forever alone lois nyan cat meme friendzoned so close no bad. True Story that happy monocle movies t-rex 9000 varius if you know what i mean. Essay ', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Bacon iron man'),
('16', '3', 'Basic math right unsave venenatis college hac in troll oh stop it, you. Twitter morbi bottom varius facebook for bra mom bacon. Happy aww yeah cool tank really? Diablo 3 all the things unlock megusta people peter griffin loki always elephant strangers. Yao dolar hammer avengers pizza on cuteness overload bart le friend portfolio. Silent Hill dog facepalm okay on blizzard male close enough party. Phone students impossibru ipsum clinton donut cookie monster cat. Pokeman monocle lol gag movie wodka joke sister ', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Nyan cat men'),
('17', '3', 'Mom nyan cat facebook jackie chan phone wodka for in sandwich rebecca black. Impossibru happy amnesia so close yao movie homer nother to do here. Pikachu anonymous t-rex people high school fun venenatis cat coffee dad. Brother panda gasp eat win just y u no admire oh stop it, you. Tank creepy me gusta derpina if you know what i mean friendzoned games movies problem? Finals the avengers iron man search male geek michelle lois collection dead donut. Keyboard read unlock scared sit oboma homework thor puking trolololo.', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Peter griffin'),
('18', '3', 'Wodka ba dumm tss panda le friend back too mainstream that super rage star wars. Keyboard dummies architect note nother to do here cellphone one does not simply laptop mom dad admire. Portfolio hulk brother gasp college puking rainbows cereal guy i dont get it read. Always t-rex true story the avengers crying simpson in movies hac pizza geek. Face strangers feel like a sir elephant le girlfriend why gentlemen top joke in poker face. House like a boss really? I See What You Did There derp loki hammer drink ', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Facebook blizzard'),
('19', '3', 'Yeah, I didn''t care about that vanity card. In fact, I went straight on with that one and just dispelled that one. But there''s also ... falling from it ... is the apple from The Giving Tree. There''s my life. Deal with it. Oh, wait! Can''t process it. Losers! WINNING! B''bye.', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Giving Tree'),
('20', '3', 'You know, they lay down with their ugly wives in front of their ugly children and just look at their loser lives and then they look at me and say, ''I CAN''T PROCESS IT!'' Well, no, and you never will. Stop trying. Just sit back and enjoy the show .... You know? And I''m like ... guys, it''s right there in the thing. Duh! We work for the Pope. We murder people.', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Stop trying'),
('21', '3', 'This is an example ticket. You can finish or ignore it.', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Welcome to Personal Kanban'),
	('22', '1', 'Different types of wood', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Wood lession chapter 1'),
	('23', '2', 'Tools form working with wood', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06',
	 'Wood lession chapter 2'),
	('24', '3', '', '0', '2013-11-21 17:01:10', '2013-12-21 16:50:06', 'Wood lession chapter 3');

INSERT INTO `canban`.`boardhasticket` (`ID`, `ID_BOARD`, `ID_TICKET`)
VALUES
	('1', '1', '1'),
('2', '2', '2'),
('3', '3', '3'),
('4', '1', '4'),
('5', '1', '5'),
('6', '2', '6'),
('7', '2', '7'),
('8', '3', '8'),
('9', '3', '9'),
('10', '4', '10'),
('11', '4', '11'),
('12', '1', '12'),
('13', '2', '13'),
('14', '3', '14'),
('15', '4', '15'),
('16', '1', '16'),
('17', '2', '17'),
('18', '3', '18'),
('19', '4', '19'),
('20', '1', '20'),
('21', '2', '21'),
	('22', '5', '22'),
	('23', '5', '23'),
	('24', '5', '24');