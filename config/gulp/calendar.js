var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var pkg = require('../../package.json');
var spawn = require('cross-spawn');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var electionDates = require('./dates/dates.json');


function registerToCalendar () {
  gutil.log(
    gutil.colors.cyan('registerToCalendar'),
    'Copying state.md files into calendar/'
  );

  return gulp.src('./content/en/register/*.md', {base: 'src'}).pipe(gulp.dest('./en/calendar/'));

}


function populateDates (done){
  gutil.log(
    gutil.colors.cyan('populateDates'),
    'Copying dates into state.md files'
  );
  for (var state in electionDates){
     fileName = "./content/en/register/" + electionDates[state].state_abbreviation + ".md"
     console.log(fileName);
     populate(fileName,state);
   };
   done();
}

function populate(fileName,state ){
  return gulp.src(fileName)
    .pipe(replace(/register = "(.+)"/, function (match,p1) {
     var register_deadline = electionDates[state].important_dates[0].date;
      return ( 'register = "' + register_deadline + '"' )
    }))
    .pipe(replace(/absentee = "(.+)"/, function (match,p1) {
     var absentee_deadline = electionDates[state].important_dates[1].date;
      return ( 'absentee = "' + absentee_deadline + '"')
    }))
    .pipe(replace(/election = "(.+)"/, function (match,p1) {
     var election_deadline = electionDates[state].important_dates[4].date;
      return ( 'election = "' + election_deadline + '"')
    }))
     .pipe(gulp.dest('./content/en/register'));
}

exports.populateDates = populateDates;
exports.registerToCalendar = registerToCalendar;
gulp.task('registerToCalendar',registerToCalendar)
gulp.task('populateDates', populateDates);
