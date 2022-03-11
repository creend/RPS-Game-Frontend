import React, { useEffect, useState } from 'react';
import { StyledButton } from './PickButton.styles';
import { IconWrapper } from './PickButton.styles';
import { Pick } from '../../types/pick';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  pickType: Pick;
}

const PickButton: React.FC<Props> = ({ pickType, ...props }) => {
  const [icon, setIcon] = useState('');
  useEffect(() => {
    (async () => {
      const icon = await import(`../../assets/icon-${pickType}.svg`);
      setIcon(icon.default);
    })();
  }, [pickType]);
  return (
    <StyledButton
      pickType={pickType}
      {...props}
      aria-label={`${pickType}-pick`}
      type="button"
    >
      <IconWrapper>
        <img alt={`${pickType} icon`} src={icon} />
      </IconWrapper>
    </StyledButton>
  );
};

export default PickButton;
