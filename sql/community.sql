select
  a.id,
  a.ts,
  a.resource,
  jsonb_build_object(
    'id', c.id,
    'resource', c.resource
  ) community,
  jsonb_build_object(
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
  ) likes
from activity a
join community c on c.id = a.resource#>>'{community,id}'
group by a.id, c.id
order by a.ts asc limit {{params.__count}} offset {{params.__skip}}
