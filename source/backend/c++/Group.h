#ifndef Group_h
#define Group_h

#include <vector>

class Individual;
class Limiter;

class Group {
public:
    /*
     
     */
    Group(std::vector<Limiter *> &limitersIn) {
        limiters = std::move(limitersIn);
    }
    
    /*
     Checks if individual can be added, and if so adds the individual.
     */
    bool addIndividual(Individual &ind);
    
    // swap something function?
    
    /*
     Returns the summed cost of each of its limiters
     */
    double getCost() const;
    
private:
    std::vector<Individual> members;
    std::vector<Limiter *> limiters;
};


#endif /* Group_h */
