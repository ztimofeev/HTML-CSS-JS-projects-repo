$(document).ready(function(){
    $('#serchUser').on('keyup', function(e){
        var username = e.target.value;

        //make request to Github
        $.ajax({
            url: 'http://api.github.com/users/'+ username,
            data:{
                client_id:'22729ac8261d71749d0d',
                client_secret:'612d8f50bc69ed28d704473984d7dfe577ad75c9'
            }
        }).done(function(user){
            $.ajax({
                url: 'https://api.github.com/users/'+ username +'/repos',
                data:{
                    client_id:'22729ac8261d71749d0d',
                    client_secret:'612d8f50bc69ed28d704473984d7dfe577ad75c9',
                    sort: 'created: desc',
                    per_page: 8
                }
            }).done(function(repos){
                // repos.sort(function(a, b){
                //     return b.id - a.id;
                // });
                $.each(repos, function(i, repo){
                    $('#repos').append(`
                        <div class="well">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong>: ${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="label label-default">Language: ${repo.language}</span>
                                    <span class="label label-primary">Size: ${repo.size}</span>
                                    <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" class="btn btn-warning tn-small" target="_blank">View Repo</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });
            $('#profile').html(`
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">${user.name}</h3>
                  </div>
                  <div class="panel-body">
                    <div clas="row">
                        <div class="col-md-3">
                            <img class="thumbnail avatar" src="${user.avatar_url}">
                            <a href="${user.html_url}" class="btn btn-primary btn-block" target="_blank">View Profile</a>
                        </div>
                        <div class="col-md-9">
                            <span class="label label-default">Public Repos: ${user.public_repos}</span>
                            <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                            <span class="label label-success">Followers: ${user.followers}</span>
                            <span class="label label-info">Following: ${user.following}</span>
                            <br><br>
                            <ul class="list-group">
                                <li class="list-group-item">Company: ${user.company}</li>
                                <li class="list-group-item">Web/Blog: ${user.blog}</li>
                                <li class="list-group-item">Location: ${user.location}</li>
                                <li class="list-group-item">Member Since: ${user.created_at}</li>
                            </ul>
                        </div>
                    </div>
                  </div>
                </div>
                <h3 class="page-header">Latest Repos</h3>
                <div id="repos"></div>
            `);
        })
    })
});
