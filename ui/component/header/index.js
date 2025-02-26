import * as MODALS from 'constants/modal_types';
import * as SETTINGS from 'constants/settings';
import { connect } from 'react-redux';
import { selectTotalBalance, selectBalance } from 'redux/selectors/wallet';
import { formatCredits } from 'util/format-credits';
import { selectGetSyncErrorMessage } from 'redux/selectors/sync';
import { selectUserVerifiedEmail, selectUserEmail, selectEmailToVerify, selectUser } from 'redux/selectors/user';
import { doClearEmailEntry, doClearPasswordEntry } from 'redux/actions/user';
import { doSetClientSetting } from 'redux/actions/settings';
import { doSignOut, doOpenModal } from 'redux/actions/app';
import { makeSelectClientSetting, selectLanguage } from 'redux/selectors/settings';
import { selectHasNavigated, selectActiveChannelClaim } from 'redux/selectors/app';
import Header from './view';
import { selectMyChannelClaims } from 'redux/selectors/claims';

const select = (state) => ({
  language: selectLanguage(state),
  balance: selectBalance(state),
  roundedSpendableBalance: formatCredits(selectBalance(state), 2, true),
  roundedBalance: formatCredits(selectTotalBalance(state), 2, true),
  currentTheme: makeSelectClientSetting(SETTINGS.THEME)(state),
  automaticDarkModeEnabled: makeSelectClientSetting(SETTINGS.AUTOMATIC_DARK_MODE_ENABLED)(state),
  hideBalance: makeSelectClientSetting(SETTINGS.HIDE_BALANCE)(state),
  authenticated: selectUserVerifiedEmail(state),
  email: selectUserEmail(state),
  syncError: selectGetSyncErrorMessage(state),
  emailToVerify: selectEmailToVerify(state),
  hasNavigated: selectHasNavigated(state),
  user: selectUser(state),
  activeChannelClaim: selectActiveChannelClaim(state),
  myChannels: selectMyChannelClaims(state),
});

const perform = (dispatch) => ({
  setClientSetting: (key, value, push) => dispatch(doSetClientSetting(key, value, push)),
  signOut: () => dispatch(doSignOut()),
  openSignOutModal: () => dispatch(doOpenModal(MODALS.SIGN_OUT)),
  clearEmailEntry: () => dispatch(doClearEmailEntry()),
  clearPasswordEntry: () => dispatch(doClearPasswordEntry()),
});

export default connect(select, perform)(Header);
