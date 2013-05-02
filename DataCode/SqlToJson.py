#!/usr/local/bin/python

import mysql.connector
import json
import collections


cnx = mysql.connector.connect(user='root', password='root', host='localhost',port='8889', database='info247')
cur = cnx.cursor()

# Find the number of active students for this week
cur.execute("select count(distinct anon_student_id) from week3")
act_rows = cur.fetchall()
act_student_count = act_rows[0][0]


#cur.execute("select gitemtype,name, module_id, count(distinct anon_student_id) from week3 where module_type = 'problem'  group by gitemtype,module_id")
cur.execute("select gitemtype,name, module_id, count(distinct anon_student_id) from week3 where module_type = 'problem'  group by gitemtype,name")

base_rows = cur.fetchall()

# Intializations
basearray_list = []
rowarray_list = []  # Base Array
rowweek_list  = []  # Weekly Activity Array
overall_list  = []  # Overall Activity Array



i = -1              # graded Item Type Count
k = -1              # Graded Item Count
CurrType = ''       # Current Item Type being considered

for row in base_rows:
	
	#******************************************************************************************************************************************************
	# If there is new Item Type, append a new 'd' entry in base array
	#******************************************************************************************************************************************************
	
	if CurrType != row[0]:                   
		
		i = i+1
		k=-1        # Reset k for every new item type
		k = k+1
		
		d = collections.OrderedDict()         #gradedItemType
		dgrade = collections.OrderedDict()    #gradeDistroGraph
		dstatus = collections.OrderedDict()   #statusGraph
		dattempt = collections.OrderedDict()  #attemptGraph
		
		
		d['name']=row[0]
		d['itemTitles'] = []
		d['itemTitles'].append(row[1])
		d['itemText'] = []
		d['itemText'].append(row[1])
		
		#******************************************************************************************************************************************************
		# Grade Distribution
		#******************************************************************************************************************************************************
		d['gradeDistroGraph']= dgrade
		dgrade['x_range'] = [0,100]
		dgrade['y_range'] = [0,3934]
		dgrade['data'] = []
		dgrade['data'].append([])
		grade_query = "select count(distinct anon_student_id), gradeperc from week3 where gradeperc != 0 and module_id = '" + row[2] + "' group by gradeperc"
		cur.execute(grade_query)
		graderow = cur.fetchall()
		grade_student_count = 0
		for g_row in graderow:
			dgrade_ind = collections.OrderedDict() 
			dgrade_ind['x'] = round(g_row[1]/100,3)
			dgrade_ind['y'] = g_row[0]
			dgrade_ind['label'] = "Grade "+str(g_row[1]) +'% : '+ str(g_row[0]) + ' Students'
			dgrade_ind['percentage'] = 0
			dgrade['data'][k].append(dgrade_ind)
			grade_student_count = grade_student_count + g_row[0]   # For Percentage
			
		for entry_g in dgrade['data'][k]:
			entry_g['percentage'] = round(float(entry_g['y']) / grade_student_count,2)
			
		#******************************************************************************************************************************************************
		# Status Graph
		#******************************************************************************************************************************************************
		d['statusGraph']= dstatus
		dstatus['y_range'] = [0,3756]
		attempt_dict = {'1':'Submitted','2':'In Progress','3':'Not Started'}
		dstatus['data'] = []
		dstatus['data'].append([])
		status_query = "select count(distinct anon_student_id), attemptflag from week3 where module_id = '" + row[2] + "' group by attemptflag"
		cur.execute(status_query)
		statusrow = cur.fetchall()
		status_student_count = 0
		flag_count = 0
		for s_row in statusrow:
			flag_count = flag_count + 1
			dstatus_ind = collections.OrderedDict()
			dstatus_ind['label'] = attempt_dict[str(s_row[1])]
			dstatus_ind['count'] = s_row[0]
			dstatus_ind['percentage'] = round(float(s_row[0]) / act_student_count,2)
			dstatus['data'][k].append(dstatus_ind)
			status_student_count = status_student_count + s_row[0]   # For Percentage
			if flag_count == 2:
				dstatus_ind = collections.OrderedDict()
				dstatus_ind['label'] = attempt_dict['3']
				dstatus_ind['count'] = act_student_count - status_student_count
				dstatus_ind['percentage'] = round((float(act_student_count - status_student_count)/act_student_count),2)
				dstatus['data'][k].append(dstatus_ind)
				
			
		#for entry_s in dstatus['data'][k]:
		#	entry_s['percentage'] = round(float(entry_s['count']) / status_student_count,2)
		
		#******************************************************************************************************************************************************
		# Attempt Graph
		#******************************************************************************************************************************************************
		d['attemptsGraph']= dattempt
		dattempt['y_range'] = [0,2666]
		x_extra = 0
		y_extra = 0
		dattempt['data'] = []
		dattempt['data'].append([])
		attempt_query = "select count(distinct anon_student_id), attempt from week3 where done = 'true' and module_id = '" + row[2] + "' group by attempt"
		cur.execute(attempt_query)
		attemptrow = cur.fetchall()
		attempt_student_count = 0
		for a_row in attemptrow:
			dattempt_ind = collections.OrderedDict()
			if a_row[1] <= 10:
				dattempt_ind['x'] = a_row[0]
				dattempt_ind['y'] = a_row[1]
				dattempt_ind['percentage'] = 0
				dattempt['data'][k].append(dattempt_ind)
			else:
				x_extra = x_extra + a_row[0]
				y_extra = 999
			attempt_student_count = attempt_student_count + a_row[0]   # For Percentage
			
		if y_extra == 999:
			dattempt_ind['x'] = x_extra
			dattempt_ind['y'] = y_extra
			dattempt_ind['percentage'] = 0
			dattempt['data'][k].append(dattempt_ind)
			
		for entry_a in dattempt['data'][k]:
			entry_a['percentage'] = round(float(entry_a['x']) / attempt_student_count,2)
			
		#******************************************************************************************************************************************************

		rowarray_list.append(d)
		CurrType = row[0]

		#******************************************************************************************************************************************************
		# If multiple of the current item type, no entry in base array
		#******************************************************************************************************************************************************
	else:
		k = k+1
		rowarray_list[i]["itemTitles"].append(row[1])
		rowarray_list[i]["itemText"].append(row[1])
		
		#******************************************************************************************************************************************************
		#Grade Distibution
		#******************************************************************************************************************************************************
		dgrade['data'].append([])
		grade_query = "select count(distinct anon_student_id), gradeperc from week3 where gradeperc != 0 and module_id = '" + row[2] + "' group by gradeperc"
		cur.execute(grade_query)
		graderow = cur.fetchall()
		grade_student_count = 0
		for g_row in graderow:
			dgrade_ind = collections.OrderedDict() 
			dgrade_ind = collections.OrderedDict() 
			dgrade_ind['x'] = round(g_row[1]/100,3)
			dgrade_ind['y'] = g_row[0]
			dgrade_ind['label'] = "Grade "+str(g_row[1]) +'% : '+ str(g_row[0]) + ' Students'
			dgrade_ind['percentage'] = 0
			dgrade['data'][k].append(dgrade_ind)
			grade_student_count = grade_student_count + g_row[0]   # For Percentage
			
		for entry in dgrade['data'][k]:
			entry['percentage'] = round(float(entry['y']) / grade_student_count,2)
			
		#******************************************************************************************************************************************************
		#Status Distibution
		#******************************************************************************************************************************************************
		dstatus['data'].append([])
		status_query = "select count(distinct anon_student_id), attemptflag from week3 where module_id = '" + row[2] + "' group by attemptflag"
		cur.execute(status_query)
		statusrow = cur.fetchall()
		status_student_count = 0
		flag_count = 0
		for s_row in statusrow:
			flag_count = flag_count + 1
			dstatus_ind = collections.OrderedDict()
			dstatus_ind['label'] = attempt_dict[str(s_row[1])]
			dstatus_ind['count'] = s_row[0]
			dstatus_ind['percentage'] = round(float(s_row[0]) / act_student_count,2)
			dstatus['data'][k].append(dstatus_ind)
			status_student_count = status_student_count + s_row[0]   # For Percentage
			if flag_count == 2:
				dstatus_ind = collections.OrderedDict()
				dstatus_ind['label'] = attempt_dict['3']
				dstatus_ind['count'] = -(act_student_count - status_student_count)
				dstatus_ind['percentage'] = round((float(act_student_count - status_student_count)/act_student_count),2)
				dstatus['data'][k].append(dstatus_ind)
			
		#for entry_s in dstatus['data'][k]:
		#	entry_s['percentage'] = round(float(entry_s['count']) / status_student_count,2)
			
		#******************************************************************************************************************************************************
		#Attempt Distribution
		#******************************************************************************************************************************************************
		
		x_extra = 0
		y_extra = 0
		dattempt['data'].append([])
		attempt_query = "select count(distinct anon_student_id), attempt from week3 where done = 'true' and module_id = '" + row[2] + "' group by attempt"
		cur.execute(attempt_query)
		attemptrow = cur.fetchall()
		attempt_student_count = 0
		for a_row in attemptrow:
			dattempt_ind = collections.OrderedDict()
			if a_row[1] <= 10:
				dattempt_ind['x'] = a_row[0]
				dattempt_ind['y'] = a_row[1]
				dattempt_ind['percentage'] = 0
				dattempt['data'][k].append(dattempt_ind)
			else:
				x_extra = x_extra + a_row[0]
				y_extra = 999
			attempt_student_count = attempt_student_count + a_row[0]   # For Percentage
		if y_extra == 999:
			dattempt_ind['x'] = x_extra
			dattempt_ind['y'] = y_extra
			dattempt_ind['percentage'] = 0
			dattempt['data'][k].append(dattempt_ind)
			
		for entry_a in dattempt['data'][k]:
			entry_a['percentage'] = round(float(entry_a['x']) / attempt_student_count,2)
		#******************************************************************************************************************************************************

#******************************************************************************************************************************************************
# Weekly Activity
#******************************************************************************************************************************************************

cur.execute("select count(distinct anon_student_id),seqnumber, seqname, seqlabel from week3 where module_type = 'sequential' group by module_id,position")
week_activity = cur.fetchall()
week3_dict = {'1':'Lecture 4: CSPs','2':'Lecture 4: CSPs (continued)','3':'Lecture 5: CSPs II','4':'Lecture 5: CSPs II (continued)','5':'Homework 2: CSPs','6':'Homework 2: CSPs (practice)'}
for w_row in week_activity:
	dweekact = collections.OrderedDict()
	dweekact['x'] = w_row[1]-1
	dweekact['y'] = w_row[0]
	dweekact['x_label'] = w_row[2]
	dweekact['label'] = w_row[3]
	rowweek_list.append(dweekact)

#******************************************************************************************************************************************************
# Overall Activity
#******************************************************************************************************************************************************
cur.execute("select * from ov_activity")
over_activity = cur.fetchall()
for o_row in over_activity:
	dweekover = collections.OrderedDict()
	dweekover['x'] = o_row[2]
	dweekover['y'] = o_row[0]
	dweekover['label'] = 'Date ' + str(o_row[1]) + ' - ' + str(o_row[0]) + ' Students Active'
	overall_list.append(dweekover)


dbase = collections.OrderedDict()
dbase['GradedItems'] = rowarray_list
dbase['WeekActivity'] = rowweek_list
dbase['OverallActivity'] = overall_list

basearray_list.append(dbase)

cur.close()


	
j = json.dumps(basearray_list)
print j


#f = open('data.js', 'w')
#print >> f, j


# Connection Close
cnx.close()
