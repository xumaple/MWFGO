#ifndef TimeConstraint_h
#define TimeConstraint_h

#include "HardConstraint.h"

class TimeConstraint : public HardConstraint {
protected:
    virtual bool isCompatible(double value1, double value2) override;
    virtual double thisCost() override { return 100; }
};


#endif /* TimeConstraint_h */
