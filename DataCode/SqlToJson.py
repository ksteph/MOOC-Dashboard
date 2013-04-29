#!/usr/local/bin/python

import mysql.connector
import json
import collections


cnx = mysql.connector.connect(user='root', password='root', host='localhost',port='8889', database='info247')
cur = cnx.cursor()


cur.execute("select count(anon_student_id), module_id, gradeperc from week3 where module_type = 'problem' and grade>0  group by module_id,gradeperc")


rows = cur.fetchall()
rowarray_list = []
i=-1
CurrRow = ''
for row in rows:
	d = collections.OrderedDict()
	d1 = collections.OrderedDict()
	if CurrRow != row[1]:
		d['title']=row[1]
		d['graph'] = []
		d['groups']=[]
		d['attempts']=[]
		rowarray_list.append(d)
		CurrRow = row[1]
		i=i+1
		
	d1['x']=row[2]
	d1['y'] = row[0]
	d1['label']= "Percentage Mark: "+ str(row[2]) +', No. of Students: ' + str(row[0])
	rowarray_list[i]['graph'].append(d1)

cur.close()


cur1 = cnx.cursor()
cur1.execute("select count(anon_student_id), module_id, attempt from week3 where module_type = 'problem' and grade>0  group by module_id,attempt")


rows1 = cur1.fetchall()
for row1 in rows1:
	d2 = collections.OrderedDict()
	j = 0
	d2['x']=row1[0]
	d2['y']=row1[2]
	d2['label']= str(row1[2]) + ' attempts / ' + str(row1[0]) + ' students'
	for l1 in rowarray_list:
		if l1['title']== row1[1]:
			l1['attempts'].append(d2)

cur1.close()

	
j = json.dumps(rowarray_list)
print j


#f = open('data2.js', 'w')
#print >> f, j
	



# Connection Close
cnx.close()
