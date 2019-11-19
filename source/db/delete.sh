TABLES="organizers events traits_ choices_ members_ leaders_ nonconstraints_"

deleteTable() {
    echo "Deleting table $1"
    psql -U postgres -c "DROP TABLE IF EXISTS \"$1\" CASCADE;"
    echo ""
}

for i in ${TABLES}
do
    deleteTable ${i}
done

for i in "$*"
do
    deleteTable ${i}
done