#include <iostream>
#include "group.h"
#include "individual.h"
#include "timeConstraint.h"
#include "constraintManager.h"
#include <string>

int main() {
    ConstraintManager m = ConstraintManager::getInstance();
//    m.addConstraint(new TimeConstraint(), std::string("schedule"));
    
    Individual i1(new double(1.00000004));
    Individual i2(new double(2.00000008));

    

//    Group g()
//    delete &m.getConstraint("schedule");
}
