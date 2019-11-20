TABLES="organizers events traits_ choices_ members_ leaders_ nonconstraints_"

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