#include "hardConstraint.h"
#include "constraintDiff.h"

ConstraintDiff HardConstraint::getDiff(double value1, double value2) {
    return isCompatible(value1, value2) ? ConstraintDiff(1, 0) : ConstraintDiff(0, thisCost());
}
