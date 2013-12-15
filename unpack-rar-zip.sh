#!/bin/bash

for i in *.rar; do unrar x $i; done;
for i in *.zip; do unzip $i; done;

read -p "delete archives (y/n)?"
[ "$REPLY" == "y" ] && rm *.rar; rm *.zip;

echo "done"