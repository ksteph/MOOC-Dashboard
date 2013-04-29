/***********************************************************Name of the Course: CS188.1x Artificial IntelligenceCourse Start Date: 09/24/2012Course End   Date: 11/18/2012Weekly Chapter Buckets----------------------Week1:  9/24  - 9/30	 Introduction to AIWeek2:  10/1  - 10/7	 Search and PlanningWeek3:  10/8  - 10/14	 Constraint Satisfaction ProblemsWeek4:  10/15 - 10/21	 Game Trees and Decision TheoryWeek5:  10/22 - 10/28	 Markov Decision Processes (MDPs)Week6:  10/29 - 11/4	 Reinforcement Learning (RL)Week7:  11/5  - 11/11	 Conclusion and Wrap-UpWeek8:  11/12 - 11/18	 No Lecture, Final Exam Week Base Table used for analysis : courseware_studentmodule***********************************************************/ /* BEGIN STEP 1Remove data from base table 'courseware_studentmodule' where created date is greater than course end date (11/18/2012)The Final was due on Nov 18, 2013 at 23:59 UTC (Info from edX Website)--> Created a new table - 'base' --> Use this table 'base' for all futher analysis*/create table base select * from courseware_studentmodule where created < '2012-11-19 00:00:00'/* END STEP 1 *//* BEGIN STEP 2Identify Date Ranges in the base Table */select * from base order by created asc limit 1select * from base order by created desc limit 1/* Oldest Date '2012-08-23 14:39:44' *//* Latest Date '2012-11-18 23:58:50' *//* BEGIN STEP 2Selecting a Specific Week for Analysis : Week 3 CONDITION 1-----------Applicable Module Ids and Rows to be included as Week 3 activity are listed below:Course.Root : i4x://BerkeleyX/CS188.1x/course/2012_Fall  State = {"position": 3}Chapter.Root : i4x://BerkeleyX/CS188.1x/chapter/Week_3    Chapter.Sequential.GradedItem            Chapter.Sequential :            (4 Lectures, 1 HW Set, 1 HW Practice Set)                Chapter.Sequential.Lecture                    i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs (First Lecture)                        Quizzes:                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_1_constraints                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_2_constraint_graph                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_3_constraints                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_4_backtracking                    i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued (Second Lecture)                        Quizzes:                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_5_forward_checking                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_6_consistency                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_7_arc_consistency                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_8_arc_consistency_backtracking                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_10_lcv                    i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II (Third Lecture)                        Quizzes:                        i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_1_tree                        i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_2_cutset                        i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_3_min                    i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued (Fourth Lecture)                        Quizzes:                        i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_4_hill                Chapter.Sequential.HW Set                    i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs                        HW Problems:                        i4x://BerkeleyX/CS188.1x/problem/csp_campus                        i4x://BerkeleyX/CS188.1x/problem/csp_facts                        i4x://BerkeleyX/CS188.1x/problem/4_queens                        i4x://BerkeleyX/CS188.1x/problem/csp_tree                        i4x://BerkeleyX/CS188.1x/problem/csp_tree_solve                Chapter.Sequential.HW Practice Set                    i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs_Practice                        HW Practice Problems:                        i4x://BerkeleyX/CS188.1x/problem/practice:csp_campus                        i4x://BerkeleyX/CS188.1x/problem/practice:csp_facts                        i4x://BerkeleyX/CS188.1x/problem/practice:4_queens                        i4x://BerkeleyX/CS188.1x/problem/practice:csp_tree                        i4x://BerkeleyX/CS188.1x/problem/practice:csp_tree_solveCONDITION 2-----------The assignment HW 2 assigned for this week was due Oct 17, 2012 at 23:59 UTCIn order to make the data as real timey as possible, lets select only those week 3 related rows with create date till Oct 17, 2012 23:59. People watching lectures and doing homeworks after the week passed doesnt add to the idea of whats happening now. */create table week3 select * from base where module_id in('i4x://BerkeleyX/CS188.1x/chapter/Week_3','i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs','i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued','i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II','i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued','i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs','i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs_Practice','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_1_constraints','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_2_constraint_graph','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_3_constraints','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_4_backtracking','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_5_forward_checking','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_6_consistency','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_7_arc_consistency','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_8_arc_consistency_backtracking','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_10_lcv','i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_1_tree','i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_2_cutset','i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_3_min','i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_4_hill','i4x://BerkeleyX/CS188.1x/problem/csp_campus','i4x://BerkeleyX/CS188.1x/problem/csp_facts','i4x://BerkeleyX/CS188.1x/problem/4_queens','i4x://BerkeleyX/CS188.1x/problem/csp_tree','i4x://BerkeleyX/CS188.1x/problem/csp_tree_solve','i4x://BerkeleyX/CS188.1x/problem/practice:csp_campus','i4x://BerkeleyX/CS188.1x/problem/practice:csp_facts','i4x://BerkeleyX/CS188.1x/problem/practice:4_queens','i4x://BerkeleyX/CS188.1x/problem/practice:csp_tree','i4x://BerkeleyX/CS188.1x/problem/practice:csp_tree_solve') and created < '2012-10-18 00:00:00'insert into week3 select * from base where module_id = 'i4x://BerkeleyX/CS188.1x/course/2012_Fall'  and state = '{"position": 3}'/* BEGIN STEP 3Add new columns to week3 table to set the following:1.Postion as a numeric value2.Number of attempts as a numberic value3.Grade Percentage4.Attempted Category - Done / Not Started / In Progress5.Use the unused column 'done' for problem status done -  True or False. Make all values NULL before updating.
6.Column to denote Graded Item Type 
7.Descriptive Name of the Module Id*//* Add Position Column */ALTER TABLE `info247`.`week3` ADD COLUMN `position` DOUBLE NULL DEFAULT NULL/* Add Number of Attempts Column */ALTER TABLE `info247`.`week3` ADD COLUMN `attempt` DOUBLE NULL DEFAULT NULL/* Add Grade Percentage Column */ALTER TABLE `info247`.`week3` ADD COLUMN `gradeperc` DOUBLE NULL DEFAULT NULL/* Add Attempted Category Column - for Done / Not Started / In Progress */ALTER TABLE `info247`.`week3` ADD COLUMN `attemptflag` VARCHAR(8) NULL DEFAULT NULL/*Set unused column 'done' to null first - Will update this with done status later */UPDATE week3 SET done = NULL
/* Add Graded Item Type */
ALTER TABLE `info247`.`week3` ADD COLUMN `gitemtype` VARCHAR(8) NULL DEFAULT NULL
/* Add Name Column */
ALTER TABLE `info247`.`week3` ADD COLUMN `name` LONGTEXT NULL DEFAULT NULL
/*   END STEP 3*/


/* BEGIN STEP 4Populate newly created columns *//* Position Column */update week3 set position = trim(trailing '}' from SUBSTR(state,13)) where module_type in ('course','chapter','sequential')/* Number of Attempts Column */update week3 set attempt = trim(trailing '}' from SUBSTR(state,11+LOCATE('"attempts":',state))) where module_type = 'problem'/* Grade Percentage Column */update week3 set grade = 0 where grade is null and module_type = 'problem'update week3 set gradeperc = round((grade/max_grade)*100,1) where module_type = 'problem'/* Done status Coulmn */update week3 set done = SUBSTR(state,8+LOCATE('"done": ',state),5) where module_type = 'problem'update week3 set done = 'true' where module_type = 'problem' and done = 'true,'/* Attempt Status Flag 1 - Submitted , 2 - In Progress, 3 - Not Started*/update week3 set attemptflag = '1' where done = 'true' and module_type = 'problem'update week3 set attemptflag = '2' where done = 'false' and attempt > 0 and module_type = 'problem'update week3 set attemptflag = '3' where done = 'false' and attempt = 0 and module_type = 'problem'
/* Item Type = homework OR practice OR quiz */
update week3 set gitemtype = 'homework' where module_id in
(
'i4x://BerkeleyX/CS188.1x/problem/csp_campus',
'i4x://BerkeleyX/CS188.1x/problem/csp_facts',
'i4x://BerkeleyX/CS188.1x/problem/4_queens',
'i4x://BerkeleyX/CS188.1x/problem/csp_tree',
'i4x://BerkeleyX/CS188.1x/problem/csp_tree_solve'
)

update week3 set gitemtype = 'practice' where module_id in
(
'i4x://BerkeleyX/CS188.1x/problem/practice:csp_campus',
'i4x://BerkeleyX/CS188.1x/problem/practice:csp_facts',
'i4x://BerkeleyX/CS188.1x/problem/practice:4_queens',
'i4x://BerkeleyX/CS188.1x/problem/practice:csp_tree',
'i4x://BerkeleyX/CS188.1x/problem/practice:csp_tree_solve'
)

update week3 set gitemtype = 'quiz' where module_id in
(
'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_1_constraints',
'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_2_constraint_graph',
'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_3_constraints',
'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_4_backtracking',
'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_5_forward_checking',
'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_6_consistency',
'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_7_arc_consistency',
'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_8_arc_consistency_backtracking',
'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_10_lcv',
'i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_1_tree',
'i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_2_cutset',
'i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_3_min',
'i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_4_hill'
)

/* Name Column */
update week3 set name = 'Lecture 4: CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs';
update week3 set name = 'Lecture 4: CSPs (continued)' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued';
update week3 set name = 'Lecture 5: CSPs II' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II';
update week3 set name = 'Lecture 5: CSPs II (continued)' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued';
update week3 set name = 'Homework 2: CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs';
update week3 set name = 'Homework 2: CSPs (practice)' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs_Practice';
update week3 set name = 'Quiz 1: Constraints' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_1_constraints';
update week3 set name = 'Quiz 2: Constraint Graphs' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_2_constraint_graph';
update week3 set name = 'Quiz 3: Constraints' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_3_constraints';
update week3 set name = 'Quiz 4: Backtracking Search' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_4_backtracking';
update week3 set name = 'Quiz 5: Forward Checking' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_5_forward_checking';
update week3 set name = 'Quiz 6: Arc Consistency' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_6_consistency';
update week3 set name = 'Quiz 7: Arc Consistency' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_7_arc_consistency';
update week3 set name = 'Quiz 8: Arc Consistency and Backtracking Search' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_8_arc_consistency_backtracking';
update week3 set name = 'Quiz 9: Least Constraining Value' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_10_lcv';
update week3 set name = 'Quiz 1: Tree-Structured CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_1_tree';
update week3 set name = 'Quiz 2: Smallest Cutset' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_2_cutset';
update week3 set name = 'Quiz 3: Min-Conflicts' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_3_min';
update week3 set name = 'Quiz 4: Hill Climbing' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_4_hill';
update week3 set name = 'Q1: Campus CSP' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/csp_campus';
update week3 set name = 'Q2: CSP Properties' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/csp_facts';
update week3 set name = 'Q3: 4-Queens' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/4_queens';
update week3 set name = 'Q4: Tree-Structured CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/csp_tree';
update week3 set name = 'Q5: Solving Tree-Structured CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/csp_tree_solve';
update week3 set name = 'Practice - Q1: Campus CSP' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/practice:csp_campus';
update week3 set name = 'Practice - Q2: CSP Properties' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/practice:csp_facts';
update week3 set name = 'Practice - Q3: 4-Queens' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/practice:4_queens';
update week3 set name = 'Practice - Q4: Tree-Structured CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/practice:csp_tree';
update week3 set name = 'Practice - Q5: Solving Tree-Structured CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/practice:csp_tree_solve';
update week3 set name = 'CS188.1x Artificial Intelligence' where module_id = 'i4x://BerkeleyX/CS188.1x/course/2012_Fall';

/*   END STEP 4 */
/* BEGIN STEP 5 Procedure to populate Overall Activity Table */DELIMITER $$DROP PROCEDURE IF EXISTS overall_activity$$CREATE DEFINER=`root`@`localhost` PROCEDURE `overall_activity`()BEGIN	DECLARE date_start DATETIME DEFAULT '2012-08-23 23:59:59';	DECLARE date_end DATETIME DEFAULT '2012-10-18 00:00:00';	WHILE (date_start<date_end) DO		INSERT INTO overall_activity SELECT count(distinct anon_student_id), date_start, UNIX_TIMESTAMP(date_start) from courseware_studentmodule where created < date_start and created > DATE_SUB(date_start,INTERVAL 7 DAY);		SET date_start = DATE_ADD(date_start,INTERVAL 1 DAY);	END WHILE;END$$/*   END STEP 5  .*/