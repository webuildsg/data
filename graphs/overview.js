'use strict';

function getData(reposSource, eventSource) {
  return [
    {
      total_updates_for_repos: getTotalUpdatesForRepos(reposSource),
      total_uniq_repos_updated: getTotalUniqRepos(reposSource),
      total_events_held: getTotalEvents(eventSource),
      total_user_groups_held_events: getTotalGroups(eventSource)
    }
  ]
}

function getTotalUpdatesForRepos(reposSource) {
  var answer = 0;

  reposSource.forEach(function(filename) {
    answer += require('.' + filename).repos.length;
  })

  return answer;
}

function getTotalUniqRepos(reposSource) {
  var answer = [];

  reposSource.forEach(function(filename) {
    require('.' + filename).repos.forEach(function(repo) {
      if (answer.indexOf(repo.name) < 0) {
        answer.push(repo.name)
      }
    })
  })

  return answer.length;
}

function getTotalEvents(eventSource) {
  var answer = 0;

  eventSource.forEach(function(filename) {
    answer += require('.' + filename).events.length;
  })

  return answer;
}

function getTotalGroups(eventSource) {
  var answer = [];

  eventSource.forEach(function(filename) {
    require('.' + filename).events.forEach(function(ev) {
      if (answer.indexOf(ev.group_name) < 0) {
        answer.push(ev.group_name)
      }
    })
  })

  return answer.length;
}

exports.getData =  getData;
