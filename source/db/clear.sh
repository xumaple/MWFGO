TABLES="organizers events traits_0 choices_0 members_0 leaders_0 nonconstraints_0"

clearTable() {
    echo "Clearing table $1"
    psql -U postgres -c "DELETE FROM \"$1\";"
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