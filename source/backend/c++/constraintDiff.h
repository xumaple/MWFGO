#ifndef constraintDiff_h
#define constraintDiff_h

class ConstraintDiff {
public:
    ConstraintDiff(): weight(0), cost(0) {} // TODO do we need this?
    ConstraintDiff(double weightIn, double costIn)
        : weight(weightIn), cost(costIn) {}
    
    double getWeight() const { return weight; }
    double getCost() const { return cost; }
    
    ConstraintDiff &operator += (ConstraintDiff other); 
private:
//TODO    friend ConstraintDiff operator+(ConstraintDiff &, ConstraintDiff&);
    double weight;
    double cost;
};

ConstraintDiff operator+ (ConstraintDiff one, ConstraintDiff two);


#endif /* constraintDiff_h */
