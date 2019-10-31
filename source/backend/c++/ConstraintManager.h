#ifndef ConstraintManager_h
#define ConstraintManager_h

#include <vector>
#include <map>
#include "Constraint.h"

class ConstraintManager {
public:
    static std::vector<Constraint *> &allConstraints() { return constraints; }
    static void addConstraint(Constraint *constraint, std::string &name);
    static int getConstraintId(std::string &name) { return constraintNames.at(name); }
    static Constraint &getConstraintAt(int index) { return *constraints[index]; }
    static Constraint &getConstraint(std::string &name) { 
        return getConstraintAt(getConstraintId(name));
    }
    static int totalConstraints() { return int(constraints.size()); }
    
private:
    static std::vector<Constraint *> constraints;
    static std::map<std::string, int> constraintNames;
};


#endif /* ConstraintManager_h */
