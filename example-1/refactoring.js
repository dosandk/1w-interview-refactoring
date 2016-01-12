var profile = {
    profileId: 1,
    URL_SERVER: 'some-url',
    scoreRation: 7.3,
    selector: {},
    sortingIntervals: [
        { start: 0,  end: 10,  status: 'child'   },
        { start: 10, end: 20,  status: 'teenager'},
        { start: 20, end: 60,  status: 'adult'   },
        { start: 60, end: 90,  status: 'old'     },
        { start: 90, end: 120, status: 'very old'}
    ],
    initialize: function() {
        var self = this;

        self.cachedElements();

        // We should use '$.when' if we want to save integrity of user data
        // If integrity of user data does not matter we can use independent ajax with callbacks
        $.when(self.getStatistic(), self.getPoliticInfo()).then(
            function(statObj, politicInfoObj) {
                var profileData = statObj[0],
                    politicalAffiliation = politicInfoObj[0];

                self.showUserName(profileData);
                self.showUserScore(profileData);
                self.showUserAge(profileData);
                self.showUserSalary(profileData);
                self.showUserPoliticalAffiliation(politicalAffiliation);
            },
            function(errorObj, message) {
                console.error('Error: ' + message);
            }
        );
    },
    cachedElements: function() {
        var self = this;

        self.selector.$userName = self.$('#name');
        self.selector.$score = self.$('#score');
        self.selector.$age = self.$('#age');
        self.selector.$salary = self.$('#salary');
        self.selector.$politicalAffiliation = self.$('#politicalAffiliation');
    },
    showUserName: function(data) {
        var self = this,
            userName = data.name;

        if (userName) {
            self.selector.$userName.html(userName);
        }
    },
    showUserScore: function(data) {
        var self = this,
            points = data.points,
            totalVotes = data.totalvotes;

        if (points && totalVotes) {
            var score = Math.round(points / totalVotes / self.scoreRation);
        }

        self.selector.$score.html(score);
    },
    showUserAge: function (data) {
        var self = this,
            age = data.age;

        if (age) {
            $.each(self.sortingIntervals, function (interval) {
                if (interval.start < age && age <= interval.end) {
                    self.selector.$age.html(interval.status);
                    return false;
                }
            });
        }
    },
    showUserSalary: function(data) {
        var self = this,
            salary = data.salary;

        if (salary) {
            self.selector.$salary.html('$' + salary).show();
        }
    },
    showUserPoliticalAffiliation: function(politicalAffiliation) {
        var self = this;

        if (politicalAffiliation) {
            self.selector.$politicalAffiliation.html(politicalAffiliation).addClass(politicalAffiliation);
        }
    },
    getStatistic: function() {
        var self = this;

        return $.ajax({
            type: 'POST',
            url: self.URL_SERVER + 'getProfileInfo',
            data: {
                userId: self.profileId
            }
        });
    },
    getPoliticInfo: function() {
        var self = this;

        return $.ajax({
            type: 'POST',
            url: self.URL_SERVER + 'getPoliticalInfo',
            data: {
                userId: self.profileId
            }
        });
    }
};