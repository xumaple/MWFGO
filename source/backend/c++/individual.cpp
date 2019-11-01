#include "individual.h"
#include "constraintDiff.h"
#include "constraint.h"
#include "constraintManager.h"

void Individual::computeDiffs(Individual &ind1, Individual &ind2) {
    std::shared_ptr<ConstraintDiff> finalDiff(new ConstraintDiff);
    ConstraintManager &manager = ConstraintManager::getInstance();
    // TODOPTIMIZE
    for (int i = 0; i < manager.totalConstraints(); ++i) {
        *finalDiff += manager.allConstraints()[i]->getDiff(ind1.values[i], ind2.values[i]);
    }
    
    
    ind1.differences[&ind2] = finalDiff;
    ind2.differences[&ind1] = finalDiff;
}

std::shared_ptr<ConstraintDiff> Individual::getDiff(Individual *other) const {
    return differences.at(other);
}

std::vector<double> Individual::getValues(const std::vector<int> indices) const {
    std::vector<double> retValues;
    retValues.reserve(indices.size());
    for (int i: indices) retValues.push_back(values[i]);
    return retValues;
}
