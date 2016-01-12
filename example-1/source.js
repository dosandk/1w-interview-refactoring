var profile = {
    profileId: 1,
    magicNamber: 7.3,
    initialize: function() {
        this.getStatistic();
    },
    getStatistic: function() {
        var self = this;

        $.ajax({
            type: 'POST',
            url: URL_SERVER + 'getProfileInfo?userId=' + self.profileId,
            data: {},
            complete: function(data) {
                self.function1(data);
            }
        });
    },
    function1: function(data) {
        var self = this;

        self.$('#name').html(data.name);

        var score = Math.round(data.points / data.totalvotes / 7.3);

        var container = self.$('#age');

        self.$('#score').html(score);

        if (data.age <= 10) {
            self.$('#age').html('child');
        } else if (data.age <= 20) {
            self.$('#age').html('teenager');
        } else if (data.age <= 60) {
            self.$('#age').html('adult');
        } else if (data.age <= 90) {
            self.$('#age').html('old');
        } else if (data.age <= 120) {
            self.$('#age').html('very old');
        }

        var sal = data.salary;

        if (data.salary) {
            data.salary = data.salary + '$';
            self.$('#salary').html(data.salary);
            self.$('#salary').show();
        }

        $.ajax({
            type: 'POST',
            url: URL_SERVER + 'getPoliticalInfo?userId=' + self.profileId,
            data: {},
            complete: function(data) {
                if (data.politicalAffiliation === 'democrat') {
                    self.$('#politicalAffiliation').html('democrat');
                    self.$('#politicalAffiliation').addClass('democrat');
                }
                else if (data.politicalAffiliation === 'republican') {
                    self.$('#politicalAffiliation').html('republican');
                    self.$('#politicalAffiliation').addClass('republican');
                }
            }
        });
    }
};