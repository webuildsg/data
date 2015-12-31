'use strict'

function getData (options) {
  return [
    {
      total_updates_for_repos: getTotalUpdatesForRepos(options.repos[ '2015' ]),
      total_uniq_repos_updated: getTotalUniqRepos(options.repos[ '2015' ]),
      total_events_held: getTotalEvents(options.events[ '2015' ]),
      total_user_groups_held_events: getTotalGroups(options.events[ '2015' ]),
      total_updates_for_repos_2016: getTotalUpdatesForRepos(options.repos[ '2016' ]),
      total_uniq_repos_updated_2016: getTotalUniqRepos(options.repos[ '2016' ]),
      total_events_held_2016: getTotalEvents(options.events[ '2016' ]),
      total_user_groups_held_events_2016: getTotalGroups(options.events[ '2016' ])
    }
  ]
}

function getTotalUpdatesForRepos (reposSource) {
  var answer = 0

  reposSource.forEach(function (filename) {
    answer += require('.' + filename).repos.length
  })

  return answer
}

function getTotalUniqRepos (reposSource) {
  var answer = []

  reposSource.forEach(function (filename) {
    require('.' + filename).repos.forEach(function (repo) {
      if (answer.indexOf(repo.name) < 0) {
        answer.push(repo.name)
      }
    })
  })

  return answer.length
}

function getTotalEvents (eventSource) {
  var answer = 0

  eventSource.forEach(function (filename) {
    answer += require('.' + filename).events.length
  })

  return answer
}

function getTotalGroups (eventSource) {
  var answer = []

  eventSource.forEach(function (filename) {
    require('.' + filename).events.forEach(function (ev) {
      if (answer.indexOf(ev.group_name) < 0) {
        answer.push(ev.group_name)
      }
    })
  })

  return answer.length
}

exports.getData = getData
