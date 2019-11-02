#ifndef constraint_h
#define constraint_h

#include <string>

class ConstraintDiff;

class Constraint {
public:
    virtual ConstraintDiff getDiff(double value1, double value2) = 0;
    
    virtual ~Constraint() {}
};

#endif /* constraint_h */
