CREATE OR REPLACE FUNCTION get_user_balance(uid UUID)
RETURNS TABLE(
    earnings NUMERIC(10,2),
    expenses NUMERIC(10,2),
    investments NUMERIC(10,2),
    balance NUMERIC(10,2)
) AS $$
BEGIN
    RETURN QUERY           
    SELECT 
        SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) AS earning,
        SUM(CASE WHEN type='EXPONSE' THEN amount ELSE 0 END) AS exponse,
        SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END) AS investment,
        (SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) -
        SUM(CASE WHEN type='EXPONSE' THEN amount ELSE 0 END) -
        SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END)) AS balance
    FROM transaction
    WHERE user_id = get_user_balance.uid;
END; $$
LANGUAGE plpgsql;