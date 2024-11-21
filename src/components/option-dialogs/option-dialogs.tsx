import { Dispatch, useState, SetStateAction } from 'react';

import MainDialog from './main-dialog';
import EditDialog from './edit-dialog';
import TrainDialog from './train-dialog';
import GotchaDialog from './gotcha-dialog';
import GotToMuteDialog from './got-to-mute-dialog';
import GotToAskBossDialog from './got-to-ask-boss-dialog';

// ----------------------------------------------------------------------
interface Props {
  quote: string;
  isSimulation: boolean;
  setShowOptions: Dispatch<SetStateAction<boolean>>;
  showOptions: boolean;
  skipOptions: boolean;
}

export default ({ isSimulation, quote, setShowOptions, showOptions, skipOptions }: Props) => {
  const [showTrain, setShowTrain] = useState(false);
  const [showGotcha, setShowGotcha] = useState(false);
  const [showGotToAskBossDialog, setShowGotToAskBossDialog] = useState(false);
  const [showGotToMuteDialog, setShowGotToMuteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <>
      {!skipOptions && (
        <>
          <MainDialog
            quote={quote}
            setShowOptions={setShowOptions}
            setShowTrain={setShowTrain}
            showOptions={showOptions}
            setShowGotToAskBossDialog={setShowGotToAskBossDialog}
            setShowGotToMuteDialog={setShowGotToMuteDialog}
            setShowEditDialog={setShowEditDialog}
          />

          <TrainDialog
            isSimulation={isSimulation}
            quote={quote}
            show={showTrain}
            setShow={setShowTrain}
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            setShowGotcha={setShowGotcha}
          />
        </>
      )}
      {skipOptions && (
        <TrainDialog
          isSimulation={isSimulation}
          quote={quote}
          show={showOptions}
          setShow={setShowOptions}
          showOptions={false}
          setShowOptions={() => {}}
          setShowGotcha={setShowGotcha}
        />
      )}
      <GotchaDialog show={showGotcha} setShow={setShowGotcha} setShowOptions={setShowOptions} />
      <GotToAskBossDialog
        show={showGotToAskBossDialog}
        setShow={setShowGotToAskBossDialog}
        setShowOptions={setShowOptions}
      />
      <GotToMuteDialog
        show={showGotToMuteDialog}
        setShow={setShowGotToMuteDialog}
        setShowOptions={setShowOptions}
      />
      <EditDialog
        show={showEditDialog}
        setShow={setShowEditDialog}
        setShowOptions={setShowOptions}
      />
    </>
  );
};
