#!/bin/bash

# styles: A4 A1
# indents: s2 s4 t
STYLES=(A1 A4)
INDENTS=(s2 s4 t)
HAPPY=false
cp "$1" "$1.bak"
for a in ${STYLES[*]}; do
	for i in ${INDENTS[*]}; do
		OUTPUT=$(astyle "-$a" "-$i" $1)
		FORMAT=$(echo $OUTPUT | grep "Formatted")
		if [ "$FORMAT" = "" ]; then
			HAPPY=true
		else
			#meld "$1.bak" "$1"
			:;
		fi
		cp "$1.bak" "$1"
		rm "$1.orig" 2>/dev/null
	done
done
if [ "$HAPPY" != "true" ]; then
	echo -e "\e[31;1mEs wurden Fehler oder Inkonsistenzen in der Einrückung oder Klammerung von $1 gefunden.\e[0m"
	exit 1;
fi
rm "$1.bak"
exit 0;
