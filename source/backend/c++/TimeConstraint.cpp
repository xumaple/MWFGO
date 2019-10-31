#include "TimeConstraint.h"
#include "ConstraintDiff.h"

bool inBetween(int val, int begin, int end) {
    return val >= begin && val <= end; 
}

bool TimeConstraint::isCompatible(double value1, double value2) {
    int begin1 = int(value1), begin2 = int(value2);
    int end1 = (value1 - begin1) * 100000000;
    int end2 = (value2 - begin2) * 100000000;
    
    return inBetween(begin2, begin1, end1) || 
        inBetween(end2, begin1, end1) || 
        inBetween(begin1, begin2, end2);
}
