#include "ConstraintDiff.h"

ConstraintDiff ConstraintDiff::operator+= (ConstraintDiff other) {
    return *this + other;
}

ConstraintDiff operator+ (ConstraintDiff one, ConstraintDiff two) {
    return ConstraintDiff(one.getWeight() + two.getWeight(), one.getCost() + two.getCost());
    //    return std::move(sum);
    // TODO make this a friend function and take out get functions
}

