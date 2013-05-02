/***********************************************************Name of the Course: CS188.1x Artificial IntelligenceCourse Start Date: 09/24/2012Course End   Date: 11/18/2012Weekly Chapter Buckets----------------------Week1:  9/24  - 9/30	 Introduction to AIWeek2:  10/1  - 10/7	 Search and PlanningWeek3:  10/8  - 10/14	 Constraint Satisfaction ProblemsWeek4:  10/15 - 10/21	 Game Trees and Decision TheoryWeek5:  10/22 - 10/28	 Markov Decision Processes (MDPs)Week6:  10/29 - 11/4	 Reinforcement Learning (RL)Week7:  11/5  - 11/11	 Conclusion and Wrap-UpWeek8:  11/12 - 11/18	 No Lecture, Final Exam Week Base Table used for analysis : courseware_studentmodule***********************************************************/ /* BEGIN STEP 1Remove data from base table 'courseware_studentmodule' where created date is greater than course end date (11/18/2012)The Final was due on Nov 18, 2013 at 23:59 UTC (Info from edX Website)--> Created a new table - 'base' --> Use this table 'base' for all futher analysis*/create table base select * from courseware_studentmodule where created < '2012-11-19 00:00:00'/* END STEP 1 *//* BEGIN STEP 2Identify Date Ranges in the base Table */select * from base order by created asc limit 1select * from base order by created desc limit 1/* Oldest Date '2012-08-23 14:39:44' *//* Latest Date '2012-11-18 23:58:50' *//* BEGIN STEP 2Selecting a Specific Week for Analysis : Week 3 CONDITION 1-----------Applicable Module Ids and Rows to be included as Week 3 activity are listed below:Course.Root : i4x://BerkeleyX/CS188.1x/course/2012_Fall  State = {"position": 3}Chapter.Root : i4x://BerkeleyX/CS188.1x/chapter/Week_3    Chapter.Sequential.GradedItem            Chapter.Sequential :            (4 Lectures, 1 HW Set, 1 HW Practice Set)                Chapter.Sequential.Lecture                    i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs (First Lecture)                        Quizzes:                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_1_constraints                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_2_constraint_graph                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_3_constraints                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_4_backtracking                    i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued (Second Lecture)                        Quizzes:                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_5_forward_checking                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_6_consistency                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_7_arc_consistency                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_8_arc_consistency_backtracking                        i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_10_lcv                    i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II (Third Lecture)                        Quizzes:                        i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_1_tree                        i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_2_cutset                        i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_3_min                    i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued (Fourth Lecture)                        Quizzes:                        i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_4_hill                Chapter.Sequential.HW Set                    i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs                        HW Problems:                        i4x://BerkeleyX/CS188.1x/problem/csp_campus                        i4x://BerkeleyX/CS188.1x/problem/csp_facts                        i4x://BerkeleyX/CS188.1x/problem/4_queens                        i4x://BerkeleyX/CS188.1x/problem/csp_tree                        i4x://BerkeleyX/CS188.1x/problem/csp_tree_solve                Chapter.Sequential.HW Practice Set                    i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs_Practice                        HW Practice Problems:                        i4x://BerkeleyX/CS188.1x/problem/practice:csp_campus                        i4x://BerkeleyX/CS188.1x/problem/practice:csp_facts                        i4x://BerkeleyX/CS188.1x/problem/practice:4_queens                        i4x://BerkeleyX/CS188.1x/problem/practice:csp_tree                        i4x://BerkeleyX/CS188.1x/problem/practice:csp_tree_solveCONDITION 2-----------The assignment HW 2 assigned for this week was due Oct 17, 2012 at 23:59 UTCIn order to make the data as real timey as possible, lets select only those week 3 related rows with create date till Oct 17, 2012 23:59. People watching lectures and doing homeworks after the week passed doesnt add to the idea of whats happening now. */create table week3 select * from base where module_id in('i4x://BerkeleyX/CS188.1x/chapter/Week_3','i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs','i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued','i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II','i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued','i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs','i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs_Practice','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_1_constraints','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_2_constraint_graph','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_3_constraints','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_4_backtracking','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_5_forward_checking','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_6_consistency','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_7_arc_consistency','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_8_arc_consistency_backtracking','i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_10_lcv','i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_1_tree','i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_2_cutset','i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_3_min','i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_4_hill','i4x://BerkeleyX/CS188.1x/problem/csp_campus','i4x://BerkeleyX/CS188.1x/problem/csp_facts','i4x://BerkeleyX/CS188.1x/problem/4_queens','i4x://BerkeleyX/CS188.1x/problem/csp_tree','i4x://BerkeleyX/CS188.1x/problem/csp_tree_solve','i4x://BerkeleyX/CS188.1x/problem/practice:csp_campus','i4x://BerkeleyX/CS188.1x/problem/practice:csp_facts','i4x://BerkeleyX/CS188.1x/problem/practice:4_queens','i4x://BerkeleyX/CS188.1x/problem/practice:csp_tree','i4x://BerkeleyX/CS188.1x/problem/practice:csp_tree_solve') and created < '2012-10-18 00:00:00'insert into week3 select * from base where module_id = 'i4x://BerkeleyX/CS188.1x/course/2012_Fall'  and state = '{"position": 3}'/* BEGIN STEP 3Add new columns to week3 table to set the following:1.Postion as a numeric value2.Number of attempts as a numberic value3.Grade Percentage4.Attempted Category - Done / Not Started / In Progress5.Use the unused column 'done' for problem status done -  True or False. Make all values NULL before updating.
6.Column to denote Graded Item Type 
7.Descriptive Name of the Module Id*//* Add Position Column */ALTER TABLE `info247`.`week3` ADD COLUMN `position` DOUBLE NULL DEFAULT NULL/* Add Number of Attempts Column */ALTER TABLE `info247`.`week3` ADD COLUMN `attempt` DOUBLE NULL DEFAULT NULL/* Add Grade Percentage Column */ALTER TABLE `info247`.`week3` ADD COLUMN `gradeperc` DOUBLE NULL DEFAULT NULL/* Add Attempted Category Column - for Done / Not Started / In Progress */ALTER TABLE `info247`.`week3` ADD COLUMN `attemptflag` VARCHAR(8) NULL DEFAULT NULL/*Set unused column 'done' to null first - Will update this with done status later */UPDATE week3 SET done = NULL
/* Add Graded Item Type */
ALTER TABLE `info247`.`week3` ADD COLUMN `gitemtype` VARCHAR(8) NULL DEFAULT NULL
/* Add Name Column */
ALTER TABLE `info247`.`week3` ADD COLUMN `name` LONGTEXT NULL DEFAULT NULL
# X Label for weekly activity
ALTER TABLE `info247`.`week3` ADD COLUMN `seqname` LONGTEXT NULL DEFAULT NULL
ALTER TABLE `info247`.`week3` ADD COLUMN `seqlabel` LONGTEXT NULL DEFAULT NULL
ALTER TABLE `info247`.`week3` ADD COLUMN `seqnumber` DOUBLE NULL DEFAULT NULL

/*   END STEP 3*/


/* BEGIN STEP 4Populate newly created columns *//* Position Column */update week3 set position = trim(trailing '}' from SUBSTR(state,13)) where module_type in ('course','chapter','sequential')/* Number of Attempts Column */update week3 set attempt = trim(trailing '}' from SUBSTR(state,11+LOCATE('"attempts":',state))) where module_type = 'problem'/* Grade Percentage Column */update week3 set grade = 0 where grade is null and module_type = 'problem'update week3 set gradeperc = round((grade/max_grade)*100,1) where module_type = 'problem'/* Done status Coulmn */update week3 set done = SUBSTR(state,8+LOCATE('"done": ',state),5) where module_type = 'problem'update week3 set done = 'true' where module_type = 'problem' and done = 'true,'/* Attempt Status Flag 1 - Submitted , 2 - In Progress, 3 - Not Started*/update week3 set attemptflag = '1' where done = 'true' and module_type = 'problem'update week3 set attemptflag = '2' where done = 'false' and attempt > 0 and module_type = 'problem'

## As per new logic, done = false and attempt >=0 is In Progress -2 , Not Started will not be there as a row.##         update week3 set attemptflag = '3' where done = 'false' and attempt = 0 and module_type = 'problem'
update week3 set attemptflag = '2' where attemptflag = '3'


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
'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_910_lcv',
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
update week3 set name = 'L4 Q1: Constraints' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_1_constraints';
update week3 set name = 'L4 Q2: Constraint Graphs' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_2_constraint_graph';
update week3 set name = 'L4 Q3: Constraints' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_3_constraints';
update week3 set name = 'L4 Q4: Backtracking Search' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_4_backtracking';
update week3 set name = 'L4 Q5: Forward Checking' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_5_forward_checking';
update week3 set name = 'L4 Q6: Arc Consistency' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_6_consistency';
update week3 set name = 'L4 Q7: Arc Consistency' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_7_arc_consistency';
update week3 set name = 'L4 Q8: Arc Consistency and Backtracking Search' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_8_arc_consistency_backtracking';
update week3 set name = 'L4 Q9: Least Constraining Value' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_4:quiz_910_lcv';
update week3 set name = 'L5 Q1: Tree-Structured CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_1_tree';
update week3 set name = 'L5 Q2: Smallest Cutset' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_2_cutset';
update week3 set name = 'L5 Q3: Min-Conflicts' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_3_min';
update week3 set name = 'L5 Q4: Hill Climbing' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/Lecture_5:quiz_4_hill';
update week3 set name = 'P1: Campus CSP' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/csp_campus';
update week3 set name = 'P2: CSP Properties' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/csp_facts';
update week3 set name = 'P3: 4-Queens' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/4_queens';
update week3 set name = 'P4: Tree-Structured CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/csp_tree';
update week3 set name = 'P5: Solving Tree-Structured CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/csp_tree_solve';
update week3 set name = 'Pr1: Campus CSP' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/practice:csp_campus';
update week3 set name = 'Pr2: CSP Properties' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/practice:csp_facts';
update week3 set name = 'Pr3: 4-Queens' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/practice:4_queens';
update week3 set name = 'Pr4: Tree-Structured CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/practice:csp_tree';
update week3 set name = 'Pr5: Solving Tree-Structured CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/problem/practice:csp_tree_solve';
update week3 set name = 'CS188.1x Artificial Intelligence' where module_id = 'i4x://BerkeleyX/CS188.1x/course/2012_Fall';

/*   END STEP 4 */
/* BEGIN STEP 5 Procedure to populate Overall Activity Table */DELIMITER $$DROP PROCEDURE IF EXISTS overall_activity$$CREATE DEFINER=`root`@`localhost` PROCEDURE `overall_activity`()BEGIN	DECLARE date_start DATETIME DEFAULT '2012-08-23 23:59:59';	DECLARE date_end DATETIME DEFAULT '2012-10-18 00:00:00';	WHILE (date_start<date_end) DO		INSERT INTO overall_activity SELECT count(distinct anon_student_id), date_start, UNIX_TIMESTAMP(date_start) from courseware_studentmodule where created < date_start and created > DATE_SUB(date_start,INTERVAL 7 DAY);		SET date_start = DATE_ADD(date_start,INTERVAL 1 DAY);	END WHILE;END$$/*   END STEP 5  .*/
# Move cut off date of Week 3 data from HW Due Date 10/17 - '2012-10-18 00:00:00' to Week End Date 10/14 - '2012-10-15 00:00:00'
# Copy the rows being removed - 10/15 to 10/17 to a test tablecreate table w3backup select * from week3 where created >= '2012-10-15 00:00:00'
delete from week3 where created >= '2012-10-15 00:00:00'

# New Total number of rows : 120205

# Filter Overall Activity to begin on semester start date and end on last day of week3.

create table ov_activity select * from overall_activity where date > '2012-09-24 00:00:00' and date < '2012-10-15 00:00:00'


# Adding Sequence names for Sequential Flattening of Weekly Activity

update week3 set seqname ='HW:P1',seqlabel='HW P1: Campus CSP' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs' and position = 1;
update week3 set seqname ='HW:P2',seqlabel='HW P2: CSP Properties' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs' and position = 2;
update week3 set seqname ='HW:P3',seqlabel='HW P3: 4-Queens' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs' and position = 3;
update week3 set seqname ='HW:P4',seqlabel='HW P4: Tree-Structured CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs' and position = 4;
update week3 set seqname ='HW:P5',seqlabel='HW P5: Solving Tree-Structured CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs' and position = 5;
update week3 set seqname ='INFO',seqlabel='Exam Practice Handout' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs' and position = 6;
update week3 set seqname ='L4:V1',seqlabel='L4 Part 1: Today' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 1;
update week3 set seqname ='L4:V2',seqlabel='L4 Part 2: CSPs: Definition' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 2;
update week3 set seqname ='L4:V3',seqlabel='L4 Part 3: CSP Examples: Map Coloring and N-Queens' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 3;
update week3 set seqname ='L4:Q1',seqlabel='L4 Quiz 1: Constraints' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 4;
update week3 set seqname ='L4:V4',seqlabel='L4 Part 4: Constraint Graphs' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 5;
update week3 set seqname ='L4:Q2',seqlabel='L4 Quiz 2: Constraint Graphs' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 6;
update week3 set seqname ='L4:V5',seqlabel='L4 Part 5: CSP Examples: Cryptarithmetic, Sudoku, and Waltz' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 7;
update week3 set seqname ='L4:Q3',seqlabel='L4 Quiz 3: Constraints' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 8;
update week3 set seqname ='L4:V6',seqlabel='L4 Part 6: Varieties of CSPs and Constraints' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 9;
update week3 set seqname ='L4:V7',seqlabel='L4 Part 7: Real-World CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 10;
update week3 set seqname ='L4:V8',seqlabel='L4 Part 8: Solving CSPs with Standard Search' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 11;
update week3 set seqname ='L4:V9',seqlabel='L4 Part 9: Backtracking Search' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 12;
update week3 set seqname ='L4:Q4',seqlabel='L4 Quiz 4: Backtracking Search' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 13;
update week3 set seqname ='L4:V10',seqlabel='L4 Part 10: Improving Backtracking: Overview' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 1;
update week3 set seqname ='L4:V11',seqlabel='L4 Part 11: Filtering: Forward Checking' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 2;
update week3 set seqname ='L4:Q5',seqlabel='L4 Quiz 5: Forward Checking' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 3;
update week3 set seqname ='L4:V12',seqlabel='L4 Part 12: Filtering: Constraint Propagation' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 4;
update week3 set seqname ='L4:V13',seqlabel='L4 Part 13: Consistency of a Single Arc' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 5;
update week3 set seqname ='L4:Q6',seqlabel='L4 Quiz 6: Arc Consistency' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 6;
update week3 set seqname ='L4:V14',seqlabel='L4 Part 14: Arc Consistency of an Entire CSP' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 7;
update week3 set seqname ='L4:Q7',seqlabel='L4 Quiz 7: Arc Consistency' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 8;
update week3 set seqname ='L4:V15',seqlabel='L4 Part 15: Limitations of Arc Consistency' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 9;
update week3 set seqname ='L4:Q8',seqlabel='L4 Quiz 8: Arc Consistency and Backtracking Search' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 10;
update week3 set seqname ='L4:V16',seqlabel='L4 Part 16: Demo of Forward Checking and Arc Consistency' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 11;
update week3 set seqname ='L4:V17',seqlabel='L4 Part 17: Variable Ordering: Minimum Remaining Values' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 12;
update week3 set seqname ='L4:V18',seqlabel='L4 Part 18: Value Ordering: Least Constraining Value' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 13;
update week3 set seqname ='L4:Q9',seqlabel='L4 Quiz 9: Least Constraining Value' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 14;
update week3 set seqname ='L4:V19',seqlabel='L4 Part 19: Demo' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 15;
update week3 set seqname ='L5:V1',seqlabel='L5 Part 1: Today' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 1;
update week3 set seqname ='L5:V2',seqlabel='L5 Part 2: Refresher: CSPs, Backtracking Search, Ordering, Filtering' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 2;
update week3 set seqname ='L5:V3',seqlabel='L5 Part 3: Arc Consistency, Limitations, K-Consistency' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 3;
update week3 set seqname ='L5:V4',seqlabel='L5 Part 4: Problem Structure' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 4;
update week3 set seqname ='L5:V5',seqlabel='L5 Part 5: Tree-Structured CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 5;
update week3 set seqname ='L5:Q1',seqlabel='L5 Quiz 1: Tree-Structured CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 6;
update week3 set seqname ='L5:V6',seqlabel='L5 Part 6: Algorithm for Tree-Structured CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 7;
update week3 set seqname ='L5:V7',seqlabel='L5 Part 7: Properties of Algorithm for Tree-Structured CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 8;
update week3 set seqname ='L5:V8',seqlabel='L5 Part 8: Improving Structure: Cutset Conditioning' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 9;
update week3 set seqname ='L5:Q2',seqlabel='L5 Quiz 2: Smallest Cutset' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 10;
update week3 set seqname ='L5:V9',seqlabel='L5 Part 9: Tree Decomposition' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 11;
update week3 set seqname ='L5:V10',seqlabel='L5 Part 10: Iterative Algorithms: Min-Conflicts' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 12;
update week3 set seqname ='L5:Q3',seqlabel='L5 Quiz 3: Min-Conflicts' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 13;
update week3 set seqname ='L5:V11',seqlabel='L5 Part 11: Performance of Min-Conflicts' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 14;
update week3 set seqname ='L5:V12',seqlabel='L5 Part 12: Summary of CSPs' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 15;
update week3 set seqname ='L5:V13',seqlabel='L5 Part 13: Local Search' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued' and position = 1;
update week3 set seqname ='L5:V14',seqlabel='L5 Part 14: Hill Climbing' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued' and position = 2;
update week3 set seqname ='L5:Q4',seqlabel='L5 Quiz 4: Hill Climbing' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued' and position = 3;
update week3 set seqname ='L5:V15',seqlabel='L5 Part 15: Simulated Annealing' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued' and position = 4;
update week3 set seqname ='L5:V16',seqlabel='L5 Part 16: Genetic Algorithms' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued' and position = 5;
update week3 set seqname ='L5:V17',seqlabel='L5 Part 17: Next Time' where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued' and position = 6;




update week3 set seqnumber =50 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs' and position = 1;
update week3 set seqnumber =51 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs' and position = 2;
update week3 set seqnumber =52 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs' and position = 3;
update week3 set seqnumber =53 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs' and position = 4;
update week3 set seqnumber =54 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs' and position = 5;
update week3 set seqnumber =55 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Homework_2_CSPs' and position = 6;
update week3 set seqnumber =1 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 1;
update week3 set seqnumber =2 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 2;
update week3 set seqnumber =3 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 3;
update week3 set seqnumber =4 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 4;
update week3 set seqnumber =5 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 5;
update week3 set seqnumber =6 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 6;
update week3 set seqnumber =7 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 7;
update week3 set seqnumber =8 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 8;
update week3 set seqnumber =9 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 9;
update week3 set seqnumber =10 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 10;
update week3 set seqnumber =11 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 11;
update week3 set seqnumber =12 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 12;
update week3 set seqnumber =13 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs' and position = 13;
update week3 set seqnumber =14 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 1;
update week3 set seqnumber =15 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 2;
update week3 set seqnumber =16 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 3;
update week3 set seqnumber =17 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 4;
update week3 set seqnumber =18 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 5;
update week3 set seqnumber =19 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 6;
update week3 set seqnumber =20 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 7;
update week3 set seqnumber =21 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 8;
update week3 set seqnumber =22 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 9;
update week3 set seqnumber =23 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 10;
update week3 set seqnumber =24 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 11;
update week3 set seqnumber =25 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 12;
update week3 set seqnumber =26 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 13;
update week3 set seqnumber =27 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 14;
update week3 set seqnumber =28 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_4_CSPs_continued' and position = 15;
update week3 set seqnumber =29 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 1;
update week3 set seqnumber =30 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 2;
update week3 set seqnumber =31 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 3;
update week3 set seqnumber =32 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 4;
update week3 set seqnumber =33 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 5;
update week3 set seqnumber =34 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 6;
update week3 set seqnumber =35 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 7;
update week3 set seqnumber =36 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 8;
update week3 set seqnumber =37 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 9;
update week3 set seqnumber =38 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 10;
update week3 set seqnumber =39 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 11;
update week3 set seqnumber =40 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 12;
update week3 set seqnumber =41 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 13;
update week3 set seqnumber =42 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 14;
update week3 set seqnumber =43 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II' and position = 15;
update week3 set seqnumber =44 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued' and position = 1;
update week3 set seqnumber =45 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued' and position = 2;
update week3 set seqnumber =46 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued' and position = 3;
update week3 set seqnumber =47 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued' and position = 4;
update week3 set seqnumber =48 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued' and position = 5;
update week3 set seqnumber =49 where module_id = 'i4x://BerkeleyX/CS188.1x/sequential/Lecture_5_CSPs_II_continued' and position = 6;





















