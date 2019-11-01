#ifndef hardConstraint_h
#define hardConstraint_h

#include "constraint.h"

class HardConstraint : public Constraint {
public:
    virtual ConstraintDiff getDiff(double value1, double value2) final;
    
protected:
    virtual bool isCompatible(double value1, double value2) = 0;
    virtual double thisCost() = 0;
};


#endif /* hardConstraint_h */
