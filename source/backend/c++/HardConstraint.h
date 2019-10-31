#ifndef HardConstraint_h
#define HardConstraint_h

#include "Constraint.h"

class HardConstraint : public Constraint {
public:
    virtual ConstraintDiff getDiff(double value1, double value2) final;
    
protected:
    virtual bool isCompatible(double value1, double value2) = 0;
    virtual double thisCost() = 0;
};


#endif /* HardConstraint_h */
