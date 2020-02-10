select
  c.id,
  c.ts,
  c.resource_type resource_type,
  c.resource || jsonb_build_object('owner',
    jsonb_build_object(
      'id', u.id,
      'resourceType', 'User',
      'name', u.resource#>>'{name}',
      'avatar', concat('https://www.gravatar.com/avatar/', md5(u.resource#>>'{email}'))
    )
  ) resource
from community c
left join userprofile u
on u.id = c.resource#>>'{owner,id}'
where c.id = {{params.id}}
union
select
  cm.id,
  cm.ts,
  cm.resource_type,
  cm.resource
  || jsonb_build_object('user', jsonb_build_object('id', u.id, 'resourceType', 'User', 'name', u.resource#>>'{name}')) resource
from communitymanager cm
left join "userprofile" u on u.id = cm.resource#>>'{user,id}'
where cm.resource#>>'{community,id}' = {{params.id}}
union
select
  a.id,
  a.ts,
  a.resource_type,
  a.resource || jsonb_build_object('likes', jsonb_build_object(
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
where a.resource#>>'{community,id}' = {{params.id}}
union
select
  u.id,
  u.ts,
  u.resource_type,
  jsonb_build_object(
    'id', u.id,
    'name', u.resource#>>'{name}',
    'resourceType', 'UserProfile',
    'avatar', concat('https://www.gravatar.com/avatar/', md5(u.resource#>>'{email}'))
  ) resource
from userprofile u
where
  u.resource#>>'{community,id}' = {{params.id}}
  OR {{params.id}} = any(knife_extract_text(resource, '[["communities", "id"]]'));
