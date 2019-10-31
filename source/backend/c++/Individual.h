#ifndef Individual_h
#define Individual_h

#include <vector>
#include <unordered_map>
#include "Constraint.h"

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


#endif /* Individual_h */
