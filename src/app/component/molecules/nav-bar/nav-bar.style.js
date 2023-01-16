export const header = {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 32px',
    background: 'rgb(13, 110, 253)',
    color: 'white',
    position: 'fixed',
    top: '0',
    left: '0px',
    width: '100%',
};
export const headerTitle = {
    margin: '0px',
    fontSize: '20px',
    fontWeight: '700',
};
export const headerNav = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '400px',
    paddingLeft: '100px',
    margin: '0px',
    fontSize: '18px',
};
export const headerLink = (borderBottom) => ({
    textDecoration: 'none',
    color: 'white',
    borderBottom: borderBottom && '1px solid white'
});