#!/bin/bash

for i in *.geo
do 
	echo "converting $i"
	gconvert $i $i.bgeo
done;

read -p "delete .geo (y/n)?"
[ "$REPLY" == "y" ] && rm *.geo;

echo "done"