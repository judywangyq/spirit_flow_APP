export const styles = {
    '*': {
      margin: '0',
      padding: '0',
      boxSizing: 'border-box',
    },
    body: {
      // fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      lineHeight: '1.5',
    },
    '@media (max-width: 768px)': {
      body: {
        fontSize: '14px',
      },
    },
    container: {
      position: 'relative',
      whiteSpace: 'nowrap',
      overflowX: 'auto',
      overflow: 'auto',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
    },
    '@media screen and (max-width: 600px)': {
      cardContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
      },
      topCard: {
        marginBottom: '10px',
      },
      bottomCards: {
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
      bottomCard: {
        margin: '10px',
      },
    },
  };
  