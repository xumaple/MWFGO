#include "constraintDiff.h"

ConstraintDiff &ConstraintDiff::operator+=(ConstraintDiff other) {
    weight += other.weight;
    cost += other.cost;
    return *this;
}

ConstraintDiff operator+ (ConstraintDiff one, ConstraintDiff two) {
    return ConstraintDiff(one.getWeight() + two.getWeight(), one.getCost() + two.getCost());
    //    return std::move(sum);
    // TODO make this a friend function and take out get functions
}

