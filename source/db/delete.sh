TABLES="organizers events traits_0 choices_0 members_0 leaders_0 nonconstraints_0"

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