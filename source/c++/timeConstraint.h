#ifndef timeConstraint_h
#define timeConstraint_h

#include "hardConstraint.h"

class TimeConstraint : public HardConstraint {
protected:
    virtual bool isCompatible(double value1, double value2) override;
    virtual double thisCost() override { return 100; }
};


#endif /* timeConstraint_h */
