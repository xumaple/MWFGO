#ifndef individual_h
#define individual_h

#include <vector>
#include <unordered_map>
#include <memory>
#include "constraint.h"

class ConstraintDiff;
//class Constraint;

class Individual {
public:
    static void computeDiffs(Individual &ind1, Individual &ind2);
    
    Individual(double *valuesIn): values(valuesIn) {}
    
    std::shared_ptr<ConstraintDiff> getDiff(Individual *other) const;
    std::vector<double> getValues(const std::vector<int> indices) const;
    
private:
    double *values;
    std::unordered_map<Individual *, std::shared_ptr<ConstraintDiff>> differences;
};


#endif /* individual_h */
