#ifndef multipleChoiceConstraint_h
#define multipleChoiceConstraint_h

#include "hardConstraint.h"

class MultipleChoiceConstraint : public HardConstraint {
protected:
    virtual bool isCompatible(double value1, double value2) override;
    virtual double thisCost() override { return 100; }
};


#endif /* multipleChoiceConstraint_h */