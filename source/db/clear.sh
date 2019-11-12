TABLES="organizers events _traits _choices _members _leaders"

clearTable() {
    echo "Clearing table $1"
    psql -U postgres -c "DROP TABLE IF EXISTS \"$1\" CASCADE;"
    echo ""
}

for i in ${TABLES}
do
    clearTable ${i}
done

for i in "$*"
do
    clearTable ${i}
done