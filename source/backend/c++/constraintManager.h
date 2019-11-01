#ifndef constraintManager_h
#define constraintManager_h

#include <vector>
#include <map>
#include "constraint.h"

class ConstraintManager {
public:
    static ConstraintManager &getInstance();

    std::vector<Constraint *> &allConstraints() { return constraints; }
    void addConstraint(Constraint *constraint, std::string &name);
    int getConstraintId(std::string &name) { return constraintNames.at(name); }
    Constraint &getConstraintAt(int index) { return *constraints[index]; }
    Constraint &getConstraint(std::string &name) { 
        return getConstraintAt(getConstraintId(name));
    }
    int totalConstraints() { return int(constraints.size()); }
    
private:
    ConstraintManager() {}

    std::vector<Constraint *> constraints;
    std::map<std::string, int> constraintNames;
};


#endif /* constraintManager_h */
