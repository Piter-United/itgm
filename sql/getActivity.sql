select
  a.id,
  a.ts,
  a.resource_type,
  a.resource
  || jsonb_build_object('community', jsonb_build_object(
    'id', c.id,
    'resourceType', 'Community',
    'name', c.resource#>>'{name}'
  ))
  || jsonb_build_object('user', jsonb_build_object(
    'id', u.id,
    'resourceType', 'Community',
    'avatar_hash', md5(u.resource#>>'{email}'),
    'name', u.resource#>>'{name}'
  ))
  || jsonb_build_object('likes', jsonb_build_object(
    'count', (
      select count(*) from activitylike acl where acl.resource#>>'{activity,id}' = a.id
    ),
    'id', (select acl.id from activitylike acl
    where acl.resource#>>'{activity,id}' = a.id and acl.resource#>>'{user,id}' = {{params.user}}
    limit 1),
    'isLike', case when (
      select true from activitylike acl
      where acl.resource#>>'{activity,id}' = a.id and acl.resource#>>'{user,id}' = {{params.user}}
      limit 1
    ) then true else false end
  )) resource
from activity a
left join community c
  on c.id = a.resource#>>'{community,id}'
left join userprofile u
  on u.id = a.resource#>>'{user,id}'
where a.id = {{params.id}}
union
select
 al.id,
 al.ts,
 al.resource_type,
 al.resource
 || jsonb_build_object('user', jsonb_build_object(
    'id', u.id,
    'resourceType', 'UserProfile',
    'name', u.resource#>>'{name}',
    'avatar_hash', md5(u.resource#>>'{email}')
  )) resource
from activitylike al
left join userprofile u
  on u.id = al.resource#>>'{user,id}'
where al.resource#>>'{activity,id}' = {{params.id}}
