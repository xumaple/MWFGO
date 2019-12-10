#include "multipleChoiceConstraint.h"
#include "constraintDiff.h"
#include <cmath>

bool MultipleChoiceConstraint::isCompatible(double value1, double value2) {
    return round(value1) == round(value2);
}
