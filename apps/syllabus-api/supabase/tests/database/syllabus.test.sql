begin;
select plan(18);

-- table test
SELECT has_table('public', 'syllabus', 'syllabus table should exist');

-- columns test
SELECT has_column('public', 'syllabus', 'id', 'id column should exist');
SELECT has_column('public', 'syllabus', 'name', 'name column should exist');
SELECT has_column('public', 'syllabus', 'start_term', 'start_term column should exist');
SELECT has_column('public', 'syllabus', 'end_term', 'end_term column should exist');
SELECT has_column('public', 'syllabus', 'category', 'category column should exist');
SELECT has_column('public', 'syllabus', 'credits', 'credits column should exist');
SELECT has_column('public', 'syllabus', 'day_of_week', 'day_of_week column should exist');
SELECT has_column('public', 'syllabus', 'period', 'period column should exist');
SELECT has_column('public', 'syllabus', 'location', 'location column should exist');
SELECT has_column('public', 'syllabus', 'is_compulsory', 'is_compulsory column should exist');
SELECT has_column('public', 'syllabus', 'description', 'description column should exist');
SELECT has_column('public', 'syllabus', 'learning_objectives', 'learning_objectives column should exist');
SELECT has_column('public', 'syllabus', 'version', 'version column should exist');
SELECT has_column('public', 'syllabus', 'created_at', 'created_at column should exist');
SELECT has_column('public', 'syllabus', 'updated_at', 'updated_at column should exist');
SELECT has_column('public', 'syllabus', 'deleted_at', 'deleted_at column should exist');

-- primary key test
SELECT has_pk('public', 'syllabus', 'syllabus table should have primary key');

select * from finish();
rollback;
